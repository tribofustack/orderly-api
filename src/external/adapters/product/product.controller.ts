import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { responseError } from 'src/external/infra/errors/reponse.error';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.productsService.delete(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    try {
      return this.productsService.findByCategory(category);
    } catch (err: any) {
      responseError(err);
    }
  }
}
