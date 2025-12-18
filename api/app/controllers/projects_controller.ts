import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { createProjectValidator, updateProjectValidator } from '#validators/project'

export default class ProjectsController {
    /**
     * List of projects with pagination
     */
    async index({ request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 15)

        // We can filter by user if needed, but for general list:
        return await Project.query()
            .preload('user') // Preload the creator
            .orderBy('createdAt', 'desc')
            .paginate(page, limit)
    }

    /**
     * Create a new project
     */
    async store({ request, auth }: HttpContext) {
        const payload = await request.validateUsing(createProjectValidator)

        // Associate with the logged-in user
        // auth.user shouldn't be null if middleware is active
        const project = await auth.user!.related('projects').create(payload)

        return project
    }

    /**
     * Show a single project
     */
    async show({ params }: HttpContext) {
        // Attempting to find by ID
        return await Project.query()
            .preload('user')
            .where('id', params.id)
            .firstOrFail()
    }

    /**
     * Update a project
     */
    async update({ params, request, response, auth }: HttpContext) {
        const project = await Project.findOrFail(params.id)

        // Verify ownership
        if (project.userId !== auth.user!.id) {
            return response.forbidden({ message: 'You are not authorized to update this project' })
        }

        const payload = await request.validateUsing(updateProjectValidator)

        project.merge(payload)
        await project.save()

        return project
    }

    /**
     * Delete a project
     */
    async destroy({ params, response, auth }: HttpContext) {
        const project = await Project.findOrFail(params.id)

        // Verify ownership
        if (project.userId !== auth.user!.id) {
            return response.forbidden({ message: 'You are not authorized to delete this project' })
        }

        await project.delete()
        return response.noContent()
    }
}
