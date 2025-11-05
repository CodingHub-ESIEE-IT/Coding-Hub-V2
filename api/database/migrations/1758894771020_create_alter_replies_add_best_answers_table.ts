import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'replies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('best_answer').defaultTo(false)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('best_answer')
    })
  }
}
