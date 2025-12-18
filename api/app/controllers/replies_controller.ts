import type { HttpContext } from '@adonisjs/core/http'
import { createReplyValidator } from '#validators/reply'
import Reply from '#models/reply'

export default class RepliesController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['content', 'topicId'])
    const payload = await createReplyValidator.validate(data)

    const reply = await Reply.create({
      content: payload.content,
      userId: 4,
      topicId: payload.topicId,
    })

    await reply.load('user')
    await reply.load('likes')

    return reply
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }

  /**
   * Toggle the best answer for a reply
   */
  async toggleBestAnswer({ params }: HttpContext) {
    const replyId = params.id

    const lastBestAnswer = await Reply.query().where('bestAnswer', true).first()

    if (lastBestAnswer && lastBestAnswer.id !== Number.parseInt(replyId, 10)) {
      lastBestAnswer.bestAnswer = false
      await lastBestAnswer.save()
    }

    const reply = await Reply.find(replyId)
    if (!reply) {
      return { error: 'Reply not found' }
    }
    reply.bestAnswer = !reply.bestAnswer
    await reply.save()
    return reply
  }
}
