export type Product = {
  id: string;
  name: string;
  genres: Array<[]>;
  region: string;
  prices: [{ category: string; idr: number }];
  stocks: [{ category: string; qty: number }];
  image: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};
