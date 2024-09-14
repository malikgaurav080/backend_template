import { checkRequiredConfigs } from '../api/helpers/index.mjs'

const {
  PORT = 8080,
  BODY_LIMIT = '5mb',
  ALLOW_CORS_ORIGIN = '',
  ALLOW_CORS_METHODS = '',
  DEFAULT_HTTP_TIMEOUT,
  API_SEC_AAUTH_API_KEY
} = process.env

const REQUIRED_CONFIG = [
  'ALLOW_CORS_ORIGIN',
  'ALLOW_CORS_METHODS',
  'API_SEC_AAUTH_API_KEY'
]

checkRequiredConfigs(REQUIRED_CONFIG)

const ALLOW_ORIGINS = ALLOW_CORS_ORIGIN.split(',')
const ALLOW_ORIGINS_REGEXP = ALLOW_ORIGINS.map(
  origin => new RegExp(_sanitizeRegExpStr(origin))
)
const httpTimeout = Number(DEFAULT_HTTP_TIMEOUT)
const HTTP_TIMEOUT = Number.isNaN(httpTimeout) ? 25000 : httpTimeout

const CORS_OPTIONS = {
  methods: ALLOW_CORS_METHODS,
  origin: ALLOW_ORIGINS_REGEXP,
  preflightContinue: false
}

const SERVER_CONFIG = {
  PORT,
  BODY_LIMIT,
  CORS_OPTIONS
}

const { npm_package_name: pkgName = '', npm_package_version: pkgVersion = '' } =
  process.env
const SERVICE = `${pkgName}@${pkgVersion}`

export default SERVER_CONFIG
export { SERVICE, HTTP_TIMEOUT, API_SEC_AAUTH_API_KEY }

function _sanitizeRegExpStr(string) {
  const escapedString = string.trim().replace(/[./]/g, '\\$&')
  const whildcardReplaced = escapedString.replace(/\*/g, '[0-9a-zA-Z.\\-_:]*')
  return `^${whildcardReplaced}$`.trim()
}
