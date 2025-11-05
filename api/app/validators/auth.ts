import vine from '@vinejs/vine'
import { UserRole } from '#models/user'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(50),
    lastName: vine.string().trim().minLength(2).maxLength(50),
    username: vine.string().trim().minLength(2).maxLength(50),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    role: vine
      .enum(UserRole)
      .optional()
      .transform((value) => value || UserRole.USER),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
