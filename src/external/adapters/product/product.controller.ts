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

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 201, description: 'Product successfully Updated.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  
  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({ status: 201, description: 'Product successfully Deleted.' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.productsService.delete(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Product' })
  @ApiResponse({ status: 200 })
  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    try {
      return this.productsService.findByCategory(category);
    } catch (err: any) {
      responseError(err);
    }
  }
}
