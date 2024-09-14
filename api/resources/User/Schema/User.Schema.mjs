'use strict'

import { buildSchema, Model } from '@am92/mongo-odm'

const UserSchemaObject = {
  email: { type: String, index: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, require: true, set: AES.encrypt, get: AES.decrypt },
  uniqueId: { type: String, unique: true },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}

const UserSchema = buildSchema(UserSchemaObject)

const UserModel = new Model('user-details', UserSchema)
export default UserModel
