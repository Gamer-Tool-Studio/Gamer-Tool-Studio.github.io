declare global {

  const BACKEND_URL: string
  const DEBUG_NAMESPACE: string

  type PricingList = Array<
    | {
      price_id: string
      value: number
      outputTokens: number
      inputTokens: number
      description: string
      platform: string
      featured: boolean
      id: string
      users: string
    }
    | never
  >

  interface StripeCreateLink {
    url: string
  }
}
export {}
