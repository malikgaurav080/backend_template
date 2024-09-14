'use strict'

import NotificationRouter from '../resources/Notification/Notification.Router.mjs'
import UserRouter from '../resources/User/User.Router.mjs'
const Routes = [
  { path: '/notification', router: NotificationRouter },
  { path: '/user', router: UserRouter }
]

export default Routes
