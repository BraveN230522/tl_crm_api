import { Chance } from '../entities/chances.entity';
import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';

export interface IOrderProduct {
  quantity: number;
  product: Product;
  order: Order;
}

export interface IChanceProduct {
  quantity: number;
  product: Product;
  chance: Chance;
}

export interface IOrderResponse extends Omit<Order, 'product'> {
  products: Product[];
}

export interface IChanceResponse extends Omit<Chance, 'product'> {
  products: Product[];
}