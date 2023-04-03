import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from '../../../entities/products.entity';
import { OrderStatus } from '../../../enums';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsInt()
  @IsNotEmpty()
  customerId: string;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsNotEmpty()
  orderProducts: Product[];
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @IsInt()
  @IsOptional()
  customerId: string;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsOptional()
  orderProducts: Product[];
}
