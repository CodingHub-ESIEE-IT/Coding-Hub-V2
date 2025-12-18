import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import Topic from '#models/topic'
import Reply from '#models/reply'
import Like from '#models/like'
import Project from '#models/project'

export enum UserRole {
  DEVELOPER = 'developer',
  ADMIN = 'admin',
  USER = 'user',
}

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare role: UserRole

  @column()
  declare bio: string | null

  @column()
  declare avatarUrl: string | null

  @hasMany(() => Topic)
  declare topics: HasMany<typeof Topic>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
