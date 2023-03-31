import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards';
import { Product } from '../../entities/products.entity';
import { IPaginationResponse } from '../../interfaces';
import { CreateProductDto, GetFilterProductDto, UpdateProductDto } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard(), RolesGuard)
// @RoleDecorator(Role.SUPER_ADMIN)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query() getFilterProducts: GetFilterProductDto,
  ): Promise<IPaginationResponse<Product[]>> {
    return this.productService.getProducts(getFilterProducts);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<string> {
    return this.productService.createProduct(createProductDto);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() updateProduct: UpdateProductDto): Promise<string> {
    return this.productService.updateProduct(id, updateProduct);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: number): Promise<string> {
    return this.productService.deleteProductById(id);
  }
}
