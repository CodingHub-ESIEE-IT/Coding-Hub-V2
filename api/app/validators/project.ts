import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(255),
        description: vine.string().optional(),
        repositoryUrl: vine.string().trim().url().optional(),
        demoUrl: vine.string().trim().url().optional(),
        thumbnailUrl: vine.string().trim().url().optional(),
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(255).optional(),
        description: vine.string().optional(),
        repositoryUrl: vine.string().trim().url().optional(),
        demoUrl: vine.string().trim().url().optional(),
        thumbnailUrl: vine.string().trim().url().optional(),
    })
)
