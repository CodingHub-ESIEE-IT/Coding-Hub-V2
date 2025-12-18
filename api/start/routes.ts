/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LikesController = () => import('#controllers/likes_controller')
const AuthController = () => import('#controllers/auth_controller')
const RepliesController = () => import('#controllers/replies_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const TopicsController = () => import('#controllers/topics_controller')
const UsersController = () => import('#controllers/users_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const AvatarsController = () => import('#controllers/avatar_controller')

router.post('/register', [AuthController, 'register']).as('auth.register').prefix('api')
router.post('/login', [AuthController, 'login']).as('auth.connexion').prefix('api')

router.get('/users/latest', [UsersController, 'latest']).prefix('api')

router
  .group(() => {
    router.resource('topics', TopicsController).apiOnly()
    router.resource('categories', CategoriesController).apiOnly()
    router.resource('replies', RepliesController).apiOnly()
    router.resource('likes', LikesController).apiOnly()
    router.resource('projects', ProjectsController).apiOnly()

    router.patch('/users/:id', [UsersController, 'update'])


    router.get('/avatars', [AvatarsController, 'index'])
    router.get('/avatar', [AvatarsController, 'show'])
    router.post('/avatar', [AvatarsController, 'select'])
    router.delete('/avatar', [AvatarsController, 'delete'])

    router.get('/topics/user/:userId', [TopicsController, 'getByUser'])

    router
      .post('/replies/:id/best-answer', [RepliesController, 'toggleBestAnswer'])
      .as('replies.bestAnswer')

    router.delete('/likes/by-reply/:id', [LikesController, 'destroyByReply'])
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout')
    router.get('/me', [AuthController, 'me']).as('auth.me')
  })
  .prefix('api')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
