/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TopicsController from "#controllers/topics_controller";

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/topics', [TopicsController, 'index'])
