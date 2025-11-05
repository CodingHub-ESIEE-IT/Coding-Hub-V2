import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(30).optional(),
    firstName: vine.string().trim().maxLength(50).optional(),
    lastName: vine.string().trim().maxLength(50).optional(),
    email: vine.string().email().optional(),
    bio: vine.string().maxLength(160).optional(),
  })
)
