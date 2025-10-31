import { defineEventHandler, getQuery, sendRedirect, setCookie } from 'h3'

const HELLO_AUTH_ENDPOINT = 'https://wallet.hello.coop/authorize'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // Handle login initiation
  if (query.login === 'true') {
    const scope = query.scope || 'openid email name picture'
    const targetUri = query.target_uri || '/'
    const clientId = config.helloClientId || 'demo-client-id'

    // Store target URI in cookie for callback
    setCookie(event, 'hello_target_uri', targetUri as string, {
      httpOnly: true,
      secure: config.public.nodeEnv === 'production',
      maxAge: 600, // 10 minutes
      path: '/',
    })

    // Build Hello.coop authorization URL
    const authUrl = new URL(HELLO_AUTH_ENDPOINT)
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', `${config.public.backendURL || 'http://localhost:3002'}/api/v1/auth/hello/callback`)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scope as string)
    authUrl.searchParams.set('response_mode', 'form_post')

    // Redirect to Hello.coop
    return sendRedirect(event, authUrl.toString(), 302)
  }

  // Handle logout
  if (query.logout === 'true') {
    const targetUri = query.target_uri || '/'

    // Clear auth cookie
    setCookie(event, 'token', '', {
      httpOnly: true,
      secure: config.public.nodeEnv === 'production',
      maxAge: 0,
      path: '/',
    })

    return sendRedirect(event, targetUri as string, 302)
  }

  return {
    status: 'ok',
    message: 'Hello.coop API endpoint',
  }
})
