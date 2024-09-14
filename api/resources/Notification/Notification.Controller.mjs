import { ResponseBody } from '@am92/express-utils'

import NotificationModel from './Notification.Model.mjs'

const NotificationController = {
  sendSMSAndEmailNotification
}

export default NotificationController

async function sendSMSAndEmailNotification(request, response, next) {
  // const { body } = request
  const data = await NotificationModel.sendSMSAndEmailNotification()
  const responseBody = new ResponseBody(200, 'OK', data)
  response.body = responseBody
  process.nextTick(next)
}
