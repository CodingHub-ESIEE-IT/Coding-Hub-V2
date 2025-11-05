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

router.post('/register', [AuthController, 'register']).as('auth.register').prefix('api')
router.post('/login', [AuthController, 'login']).as('auth.connexion').prefix('api')

router
  .group(() => {
    router.resource('topics', TopicsController).apiOnly()
    router.resource('categories', CategoriesController).apiOnly()
    router.resource('replies', RepliesController).apiOnly()
    router.resource('likes', LikesController).apiOnly()

    router.patch('/users/:id', [UsersController, 'update'])

    router.get('/avatars', '#controllers/avatars_controller.index')
    router.get('/avatar', '#controllers/avatars_controller.show')
    router.post('/avatar', '#controllers/avatars_controller.select')
    router.delete('/avatar', '#controllers/avatars_controller.delete')

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
