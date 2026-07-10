/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // in COP (Colombian Pesos) or standard currency notation
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  colors: string[];
  sizes: number[];
  isNew?: boolean;
  isHot?: boolean;
  gender?: 'Dama' | 'Caballero' | 'Unisex';
  images?: string[];
  colorImages?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
  selectedColorImage?: string;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  cedula: string;
  observaciones?: string;
  paymentMethod: 'bold_tarjeta' | 'transferencia';
}
