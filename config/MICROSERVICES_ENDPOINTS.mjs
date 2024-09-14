import { checkRequiredConfigs } from '../api/helpers/index.mjs'

const {
  BLUTO_OAUTH = '',
  TEESTA_MS = '',
  JHELUM_MS = '',
  HERMES_MS = '',
  SAFEGOLD_ENDPOINT = ''
} = process.env

const REQUIRED_CONFIG = [
  'BLUTO_OAUTH',
  'TEESTA_MS',
  'JHELUM_MS',
  'HERMES_MS',
  'SAFEGOLD_ENDPOINT'
]

checkRequiredConfigs(REQUIRED_CONFIG)

const MICROSERVICES_ENDPOINTS = {
  BLUTO_OAUTH,
  TEESTA_MS,
  JHELUM_MS,
  HERMES_MS,
  SAFEGOLD_ENDPOINT
}

export default MICROSERVICES_ENDPOINTS
