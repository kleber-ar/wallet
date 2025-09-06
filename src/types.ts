export type ExpenseType = {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: Record<string, ExchangeRateType>;
};

export type ExchangeRateType = {
  code: string;
  name: string;
  ask: string;
}


