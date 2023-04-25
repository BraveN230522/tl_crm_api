import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
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

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  shippingAddress: string;

  @IsString()
  @IsOptional()
  billingAddress: string;

  @IsNumber()
  @IsOptional()
  paymentDate: number;

  @IsNumber()
  @IsOptional()
  deliveryDate: number;

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

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  shippingAddress: string;

  @IsString()
  @IsOptional()
  billingAddress: string;

  @IsNumber()
  @IsOptional()
  paymentDate: number;

  @IsNumber()
  @IsOptional()
  deliveryDate: number;

  @IsInt()
  @IsOptional()
  customerId: string;

  @IsInt()
  @IsOptional()
  importerId: string;

  @IsInt()
  @IsOptional()
  exporterId: string;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsOptional()
  orderProducts: Product[];
}

export class GetOrderDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  search?: string;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  fromDate?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  toDate?: number;

  @Transform((params) => {
    return Number(params.value);
  })
  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
