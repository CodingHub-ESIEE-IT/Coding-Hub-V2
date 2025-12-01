import type { HttpContext } from '@adonisjs/core/http'
import Topic from '#models/topic'
import { createTopicValidator } from '#validators/topic'

export default class TopicsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 15)
    const category = request.input('category', null)

    const query = Topic.query().preload('user').preload('categories').orderBy('createdAt', 'desc')

    if (category) {
      query.whereHas('categories', (categoryQuery) => {
        categoryQuery.where('categories.name', category)
      })
    }

    return await query.paginate(page, limit)
  }

  async getByUser({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 15)

    return await Topic.query()
      .preload('user')
      .preload('replies')
      .preload('categories')
      .where('userId', params.userId)
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
  }

  async store({ request }: HttpContext) {
    const data = request.only(['title', 'content', 'status', 'categoryIds'])
    const payload = await createTopicValidator.validate(data)

    const { categoryIds, ...topicData } = data

    const topic = await Topic.create({
      ...topicData,
      userId: 4,
    })

    if (payload.categoryIds && payload.categoryIds.length > 0) {
      await topic.related('categories').attach(payload.categoryIds)
    }

    await topic.load('categories')

    return topic
  }

  async show({ params }: HttpContext) {
    return await Topic.query()
      .preload('user')
      .preload('categories')
      .preload('replies', (repliesQuery) => {
        repliesQuery.preload('user').preload('likes')
      })
      .where('id', params.id)
      .first()
  }

  async update({ params, request }: HttpContext) {
    const topic = await Topic.findOrFail(params.id)
    const data = request.only(['title', 'content', 'status', 'userId', 'resolveAt'])
    topic.merge(data)
    return await topic.save()
  }
}
