declare global {

  const BACKEND_URL: string
  const DEBUG_NAMESPACE: string

  type PricingList = Array<
    | {
      stripe_price_id: string
      value: number
      outputTokens: number
      inputTokens: number
      description: string
      featured: boolean
      users: number | string
      isFreeTrial?: boolean
    }
    | never
  >

  interface StripeCreateLink {
    url: string
  }
}
export {}
