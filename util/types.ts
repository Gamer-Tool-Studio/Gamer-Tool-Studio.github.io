declare const BACKEND_URL: string;

declare type PricingList = Array<
  | {
      price_id: string;
      value: number;
      outputTokens: number;
      inputTokens: number;
      description: string;
      platform: string;
      featured: boolean;
      id: string;
      users: string;
    }
  | never
>;
