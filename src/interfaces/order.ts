import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';

export interface IOrderProduct {
  quantity: number;
  product: Product;
  order: Order;
}

export interface IOrderResponse extends Omit<Order, 'product'> {
  products: Product[];
}
