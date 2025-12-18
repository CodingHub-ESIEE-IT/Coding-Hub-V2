import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import string from '@adonisjs/core/helpers/string'

export default class Project extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare slug: string

    @column()
    declare description: string | null

    @column()
    declare repositoryUrl: string | null

    @column()
    declare demoUrl: string | null

    @column()
    declare thumbnailUrl: string | null

    @column()
    declare userId: number

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    @beforeCreate()
    static async slugify(project: Project) {
        if (project.title && !project.slug) {
            project.slug = string.slug(project.title) + '-' + string.random(6)
        }
    }
}
