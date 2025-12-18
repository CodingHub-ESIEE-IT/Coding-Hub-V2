import type { HttpContext } from '@adonisjs/core/http'
import { availableAvatars } from '#config/avatar'
import vine from '@vinejs/vine'

const selectAvatarValidator = vine.compile(
  vine.object({
    avatarUrl: vine.string().trim().in(availableAvatars),
  })
)

export default class AvatarsController {
  /**
   * Récupérer la liste des avatars disponibles
   */
  async index({ response }: HttpContext) {
    return response.ok({
      avatars: availableAvatars,
    })
  }

  /**
   * Sélectionner un avatar pour l'utilisateur connecté
   */
  async select({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    console.log(user)

    const { avatarUrl } = await request.validateUsing(selectAvatarValidator)

    user.avatarUrl = avatarUrl
    await user.save()

    return response.ok({
      message: 'Avatar mis à jour avec succès',
      avatarUrl: user.avatarUrl,
    })
  }

  /**
   * Supprimer l'avatar de l'utilisateur connecté
   */
  async delete({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (!user.avatarUrl) {
      return response.badRequest({ message: 'Aucun avatar à supprimer' })
    }

    user.avatarUrl = null
    await user.save()

    return response.ok({ message: 'Avatar supprimé avec succès' })
  }

  /**
   * Récupérer l'avatar de l'utilisateur connecté
   */
  async show({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    return response.ok({
      avatarUrl: user.avatarUrl,
      availableAvatars,
    })
  }
}
