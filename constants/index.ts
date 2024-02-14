import _process from 'node:process'

const apiVersion = _process.env.API_VERSION
export const BASE_URL = _process.server
  ? _process.env.NODE_ENV !== 'production'
    ? `http://localhost:3002/api/${apiVersion}/`
    : `https://example.com/api/${apiVersion}/`
  : null
