import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.text('description').nullable()
      table.string('repository_url', 255).nullable()
      table.string('demo_url', 255).nullable()
      table.string('thumbnail_url', 255).nullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
