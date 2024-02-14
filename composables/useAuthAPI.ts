import type { AsyncData } from 'nuxt/app'

const debug = getDebugger('composables:useAuthAPI')

export default function<T>(
  endpoint: string,
  method:
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'get'
    | 'head'
    | 'patch'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | undefined,
  body?: any,
  query?: any,
) {
  const config = useRuntimeConfig()
  const BASE_URL = `${config.public.backendURL}/api/v1`
  const token = useCookie('token') // get token from cookies

  return useFetch(BASE_URL + endpoint, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` },
    body,
    query,
    credentials: 'include', // fetch

    onResponseError({ request, response, options }) {
      // Handle the request errors
      debug.log(request, response, options)

      if (response.status === 401) {
        debug.log('Logged out, redirecting to login')
        const { logUserOut } = useAuthStore() // use authenticateUser action from  auth store
        logUserOut()

        const router = useRouter()
        router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
      }
    },
  }) as AsyncData<T, string>
}
