'use strict'
import { CustomError } from '@am92/express-utils'
import jwt from 'jsonwebtoken'

import UserDbModel from '../Schema/User.Schema.mjs'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

async function signUp(body) {
  const { email, username, password } = body
  try {
    const newUser = await UserDbModel.createOne({
      email,
      username,
      password,
      uniqueId: `user_${Date.now()}`
    })

    return { message: 'User registered successfully', newUser }
  } catch (error) {
    throw new CustomError(error)
  }
}

async function signIn(body) {
  const { email, password } = body
  try {
    // Find user by email
    const user = await UserDbModel.findOne({ email })

    if (!user)
      throw new CustomError(undefined, {
        message: 'User not found',
        statusCode: 400
      })

    // Compare password
    if (user.password != password)
      throw new CustomError(undefined, {
        message: 'Invalid Credentials',
        statusCode: 400
      })

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId: user.uniqueId }, JWT_SECRET, {
      expiresIn: '15m'
    })
    const refreshToken = jwt.sign(
      { userId: user.uniqueId },
      JWT_REFRESH_SECRET,
      { expiresIn: '1d' }
    )

    return { accessToken, refreshToken }
  } catch (error) {
    throw new CustomError(error)
  }
}

const UserModel = {
  signUp,
  signIn
}

export default UserModel
