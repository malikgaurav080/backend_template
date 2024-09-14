import { configureRouter } from '@am92/express-utils'
import { validateApiKey, validateToken } from '@m92/api-sec'
import Express from 'express'

import UserController from './User.Controller.mjs'

const config = {
  preMiddlewares: [validateApiKey, validateToken],
  postMiddlewares: [],
  routesConfig: {
    signUp: {
      method: 'post',
      path: '/signUp',
      enabled: true,
      disableCrypto: false,
      pipeline: [UserController.signUp]
    }
  }
}

const UserRouter = configureRouter(new Express.Router(), config)

export default UserRouter
