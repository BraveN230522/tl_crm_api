import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsRepository) private usersRepository: ProductsRepository) {}
}
