import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.only(['username', 'email', 'bio', 'firstName', 'lastName'])
    const userId = params.id

    const user = await User.find(userId)

    console.log('Updating user:', userId, data)
    if (!user) {
      return { error: 'User not found' }
    }

    user.username = data.username || user.username
    user.firstName = data.firstName || user.firstName
    user.lastName = data.lastName || user.lastName
    user.email = data.email || user.email
    user.bio = data.bio || user.bio

    await user.save()

    return user
  }
}
