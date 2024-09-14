'use strict'

import crypto from 'crypto'
const { AES_KEY } = process.env
const key = Buffer.from(AES_KEY, 'base64')

function encrypt(plaintext) {
  const plaintextJson = JSON.stringify(plaintext)

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([
    cipher.update(plaintextJson, 'utf8'),
    cipher.final()
  ])

  return [enc, iv, cipher.getAuthTag()].map(e => e.toString('base64')).join('~')
}

function decrypt(ciphertext) {
  const [enc, iv, authTag] = ciphertext
    .split('~')
    .map(e => Buffer.from(e, 'base64'))
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  const plaintext = Buffer.concat([
    decipher.update(enc, 'utf8'),
    decipher.final()
  ]).toString()
  return JSON.parse(plaintext)
}

const AES = { encrypt, decrypt, key }

export default AES
