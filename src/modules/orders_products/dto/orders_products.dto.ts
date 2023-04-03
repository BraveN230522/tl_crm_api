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
  status: string;

  @IsInt()
  @IsNotEmpty()
  customerId: string;

  @IsInt()
  @IsNotEmpty()
  importer_id: string;

  @IsOptional()
  @IsInt()
  exporter_id: string;

  @Type(() => Product)
  @ValidateNested({
    each: true,
  })
  @IsObject({ each: true })
  @IsArray()
  @IsNotEmpty()
  orderProducts: Product[];
}
