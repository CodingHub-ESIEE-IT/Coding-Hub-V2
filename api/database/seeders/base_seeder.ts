import {BaseSeeder} from '@adonisjs/lucid/seeders'
import Topic, {TopicStatus} from "#models/topic";
import User, {UserRole} from "#models/user";
import Category from "#models/category";
import {DateTime} from "luxon";

export default class extends BaseSeeder {
  async run() {
    const user = await User.firstOrCreate({
      email: 'test@example.com'
    }, {
      username: 'user1',
      firstName: 'User1',
      lastName: 'User1',
      email: 'user.user@gmail.com',
      password: 'password',
      role: UserRole.USER,
    })

    const categories = await Category.createMany([
      { name: 'Développement Web' },
      { name: 'Base de données' },
      { name: 'DevOps' },
      { name: 'Frontend' },
      { name: 'Backend' }
    ])

    const topics = await Topic.createMany([
      {
        title: 'Guide complet AdonisJS',
        content: 'Contenu détaillé sur AdonisJS...',
        status: TopicStatus.PUBLISHED,
        userId: user.id,
        resolveAt: null
      },
      {
        title: 'Brouillon: Migration PostgreSQL',
        content: 'Notes sur la migration...',
        status: TopicStatus.DRAFT,
        userId: user.id,
        resolveAt: null
      },
      {
        title: 'Discussion fermée: Performance',
        content: 'Discussion sur les performances...',
        status: TopicStatus.CLOSED,
        userId: user.id,
        resolveAt: DateTime.now()
      },
      {
        title: 'Archives: Ancien débat',
        content: 'Ancien contenu archivé...',
        status: TopicStatus.ARCHIVED,
        userId: user.id,
        resolveAt: DateTime.now().minus({ months: 1 })
      }
    ])

    for (const topic of topics) {
      const randomCategories = categories
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1)

      await topic.related('categories').attach(
        randomCategories.map(category => category.id)
      )
    }

    for (const topic of topics) {
      if (topic.status === TopicStatus.PUBLISHED) {
        await topic.related('replies').createMany([
          {
            content: 'Super sujet, merci !',
            userId: user.id
          },
          {
            content: 'Très intéressant, pourriez-vous développer ?',
            userId: user.id
          }
        ])
      }
    }
  }
}
