import { Chance } from '../entities/chances.entity';
import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';
import { IProduct } from './response';

export interface IOrderProduct {
  quantity: number;
  product: IProduct;
  order: Order;
}

export interface IChanceProduct {
  quantity: number;
  product: IProduct;
  chance: Chance;
}

export interface IOrderResponse extends Omit<Order, 'product' | 'updateDateCreation' | 'updateManagedAt'> {
  products: IProduct[];
}

export interface IChanceResponse extends Omit<Chance, 'product' | 'updateDateCreation' | 'updateManagedAt'> {
  products: IProduct[];
}