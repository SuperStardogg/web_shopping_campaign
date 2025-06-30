export type Campaign =
  | { type: 'fixed'; amount: number }
  | { type: 'percentage'; percentage: number }
  | { type: 'category_percentage'; category: string; percentage: number }
  | { type: 'point'; points: number }
  | { type: 'seasonal'; every: number; discount: number };
