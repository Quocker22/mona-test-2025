export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Promotion {
  id: string;
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
}
export interface OrderForm {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  cart: CartItem[];
  paymentMethod: 'CASH' | 'CARD';
  cashAmount?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price?: number;
  promotionId?: string;
}
