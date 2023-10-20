import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';

import { ProductsService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 201, description: 'Product successfully Updated.' })
  @Put()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({ status: 201, description: 'Product successfully Deleted.' })
  @Delete()
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @ApiOperation({ summary: 'Get Product' })
  @ApiResponse({ status: 200 })
  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }
}
