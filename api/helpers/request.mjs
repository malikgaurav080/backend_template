import { EXPS_CONST, httpContext } from '@am92/express-utils'
import NodeHttp from '@am92/node-http'

import {
  API_SEC_AAUTH_API_KEY,
  HTTP_TIMEOUT
} from '../../config/SERVER_CONFIG.mjs'

const CustomHeaderInterceptor = {
  request: [customHeaderRequestSuccess, null, { synchronous: true }]
}

const nodeHttp = new NodeHttp()
nodeHttp.useRequestInterceptor(CustomHeaderInterceptor.request)

export default nodeHttp

function customHeaderRequestSuccess(config) {
  const requestId = httpContext.getRequestId()
  const sessionId = httpContext.getSessionId()

  config.headers[EXPS_CONST.REQUEST_ID_HEADER_KEY] = requestId
  config.headers[EXPS_CONST.SESSION_ID_HEADER_KEY] = sessionId
  config.headers['x-api-key'] = API_SEC_AAUTH_API_KEY

  return config
}

export function request(options) {
  options.timeout = options.timeout || HTTP_TIMEOUT
  return nodeHttp.request(options)
}
