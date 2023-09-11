const apiVersion = process.env.API_VERSION;
export const BASE_URL = process.server
  ? process.env.NODE_ENV !== 'production'
    ? `http://localhost:3002/api/${apiVersion}/`
    : `https://example.com/api/${apiVersion}/`
  : null;
