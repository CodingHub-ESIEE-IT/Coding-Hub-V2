import vine from '@vinejs/vine'
import { sanitizeHtml } from '../../utils/sanitize.js'
import { FieldContext } from '@vinejs/vine/types'
import { TopicStatus } from '#models/topic'

const sanitizedHtml = vine.createRule((value: unknown, _options, field: FieldContext) => {
  if (typeof value !== 'string') {
    field.report('Le contenu doit être une chaîne de caractères', 'string', field)
    return
  }

  return sanitizeHtml(value)
})

export const createTopicValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    content: vine.string().use(sanitizedHtml()),
    status: vine.enum(TopicStatus),
    categoryIds: vine.array(vine.number()).minLength(1),
  })
)
