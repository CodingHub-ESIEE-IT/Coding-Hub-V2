import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'category_topic'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('topic_id').unsigned().references('topics.id').onDelete('CASCADE').notNullable()
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE').notNullable()
      table.unique(['topic_id', 'category_id'])
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
