import type { HttpContext } from '@adonisjs/core/http'
import { createLikeValidator } from '#validators/like'
import Like from '#models/like'

export default class LikesController {
  async store({ request }: HttpContext) {
    const data = request.only(['userId', 'replyId'])
    const payload = await createLikeValidator.validate(data)

    const reply = await Like.create({
      userId: payload.userId,
      replyId: payload.replyId,
    })

    await reply.load('user')

    return reply
  }

  async show({ params }: HttpContext) {
    const data = await Like.query().preload('reply', (replyQuery) => {
      replyQuery.where('id', params.id)
    })

    return data.length
  }

  async destroy({ params, response }: HttpContext) {}

  async destroyByReply({ request, response, params }: HttpContext) {
    const { userId } = request.only(['userId'])
    const replyId = params.id

    if (!userId || !replyId) {
      return response.status(400).json({
        message: 'userId et replyId sont requis',
      })
    }

    const like = await Like.query().where('userId', userId).where('replyId', replyId).first()

    if (!like) {
      return response.status(404).json({ message: 'Like not found' })
    }

    await like.delete()
    return { message: 'Like deleted successfully' }
  }
}
