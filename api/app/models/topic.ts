import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Reply from '#models/reply'
import Category from '#models/category'
import User from '#models/user'
import string from '@adonisjs/core/helpers/string'

export enum TopicStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  CLOSED = 'closed',
}

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare slug: string

  @column()
  declare status: TopicStatus

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>

  @manyToMany(() => Category)
  declare categories: ManyToMany<typeof Category>

  @column.dateTime()
  declare resolveAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async createSlug(topic: Topic) {
    if (!topic.slug || topic.$dirty.slug) {
      topic.slug = string.slug(topic.title).toLocaleLowerCase()

      const existingTopic = await Topic.query()
        .where('slug', topic.slug)
        .whereNot('id', topic.id || 0)
        .first()

      if (existingTopic) {
        topic.slug = `${topic.slug}-${Date.now().toString().slice(-6)}`
      }
    }
  }
}
