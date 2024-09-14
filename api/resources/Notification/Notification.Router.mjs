import { configureRouter } from '@am92/express-utils'
import { validateApiKey, validateToken } from '@m92/api-sec'
import Express from 'express'

import NotificationController from './Notification.Controller.mjs'

const config = {
  preMiddlewares: [validateApiKey, validateToken],
  postMiddlewares: [],
  routesConfig: {
    sendSMSAndEmailNotification: {
      method: 'post',
      path: '/sendSMSAndEmailNotification',
      enabled: true,
      disableCrypto: false,
      pipeline: [NotificationController.sendSMSAndEmailNotification]
    }
  }
}

const NotificationRouter = configureRouter(new Express.Router(), config)

export default NotificationRouter
