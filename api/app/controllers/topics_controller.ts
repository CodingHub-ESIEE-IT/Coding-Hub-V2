// import type { HttpContext } from '@adonisjs/core/http'

import {HttpContext} from "@adonisjs/core/http";
import Topic from "#models/topic";

export default class TopicsController {

  /**
   * Récupère la liste paginée des topics avec leurs relations
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 15)

    return await Topic.query()
      .preload('user')
      .preload('categories')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
  }

  async store({request}: HttpContext) {
    const data = request.only(['title', 'content', 'status', 'userId', 'resolveAt'])
    return await Topic.create(data)
  }

  async show({params}: HttpContext) {
    return await Topic.findOrFail(params.id)
  }

  async update({params, request}: HttpContext) {
    const topic = await Topic.findOrFail(params.id)
    const data = request.only(['title', 'content', 'status', 'userId', 'resolveAt'])
    topic.merge(data)
    return await topic.save()
  }
}
