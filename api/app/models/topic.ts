import { DateTime } from 'luxon'
import {BaseModel, belongsTo, column, hasMany, manyToMany} from '@adonisjs/lucid/orm'
import type {BelongsTo, HasMany, ManyToMany} from "@adonisjs/lucid/types/relations";
import Reply from "#models/reply";
import Category from "#models/category";
import User from "#models/user";

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
}
