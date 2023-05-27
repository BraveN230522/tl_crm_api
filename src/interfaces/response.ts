import { Chance } from '../entities/chances.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';

export interface IProduct extends Omit<Product, 'updateDateCreation' | 'updateManagedAt'> {
  deletedAt?: string;
}

export interface IAuth extends Omit<Chance, 'updateDateCreation' | 'updateManagedAt'> {
  deletedAt?: string;
}

export interface IUser extends Omit<User, 'updateDateCreation' | 'updateManagedAt'> {
  deletedAt?: string;
}
