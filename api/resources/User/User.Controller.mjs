import { ResponseBody } from '@am92/express-utils'

import UserModel from './Models/User.Model.mjs'

const UserController = {
  signUp,
  signIn
}

export default UserController

async function signUp(request, response, next) {
  const { body } = request
  const data = await UserModel.signUp(body)
  const responseBody = new ResponseBody(200, 'OK', data)
  response.body = responseBody
  process.nextTick(next)
}

async function signIn(request, response, next) {
  const { body } = request
  const data = await UserModel.signIn(body)
  const responseBody = new ResponseBody(200, 'OK', data)
  response.body = responseBody
  process.nextTick(next)
}
