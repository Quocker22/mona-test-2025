import { Product, Promotion } from '@/types';

export const products: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', price: 10000000 },
  { id: '2', name: 'MacBook Air M2', price: 12000000 },
  { id: '3', name: 'AirPods Pro', price: 2000000 },
  { id: '4', name: 'iPad Air', price: 5000000 },
  { id: '5', name: 'Apple Watch Series 9', price: 3000000 },
];

export const promotions: Promotion[] = [
  { 
    id: '1', 
    code: 'SAVE10', 
    type: 'PERCENTAGE', 
    value: 10,
  },
  { 
    id: '2', 
    code: 'SAVE20', 
    type: 'PERCENTAGE', 
    value: 20,
  },
  { 
    id: '3', 
    code: 'FLAT50', 
    type: 'FIXED', 
    value: 50,
  },
  { 
    id: '4', 
    code: 'FLAT100', 
    type: 'FIXED', 
    value: 100,
  },
]; 