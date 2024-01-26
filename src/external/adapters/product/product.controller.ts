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
import { responseError } from 'src/external/infra/errors/reponse.error';

import { CreateProduct } from '../../../internal/application/useCases/product/create-product.usecase';
import { DeleteProduct } from '../../../internal/application/useCases/product/delete-product.usecase';
import { FindProductsByCategory } from '../../../internal/application/useCases/product/find-by-category.usecase';
import { GetProductCategories } from '../../../internal/application/useCases/product/get-categories.usecase';
import { UpdateProduct } from '../../../internal/application/useCases/product/update-product.usecase';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductSwagger, CreatedProductSwagger, EditProductSwagger, LoadedCategoriesSwagger, LoadedProductsByCategorySwagger } from 'src/internal/application/docs/swagger/product/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly deleteProduct: DeleteProduct,
    private readonly findProductsByCategory: FindProductsByCategory,
    private readonly getProductCategories: GetProductCategories,
    private readonly updateProduct: UpdateProduct
  ) { }

  @ApiOperation({ summary: 'Create Product' })
  @ApiBody({ type: CreateProductSwagger })
  @ApiResponse({ status: 201, description: 'Product successfully created.', type: CreatedProductSwagger })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.createProduct.execute(createProductDto);
    } catch (err: any) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Update Product' })
  @ApiBody({ type: EditProductSwagger })
  @ApiResponse({ status: 200, description: 'Product successfully Updated.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.updateProduct.execute(id, updateProductDto);
    } catch (err: any) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({ status: 200, description: 'Product successfully Deleted.' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.deleteProduct.execute(id);
    } catch (err: any) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Product' })
  @ApiResponse({ status: 200, description: 'products by categories successfully loaded.', type: LoadedProductsByCategorySwagger })
  @Get('category/:id')
  async findByCategory(@Param('id') id: string) {
    try {
      return await this.findProductsByCategory.execute(id);
    } catch (err: any) {
      return responseError(err);
    }
  }

  @ApiOperation({ summary: 'Get Categories' })
  @ApiResponse({ status: 200, description: 'Categories successfully loaded.', type: LoadedCategoriesSwagger })
  @Get('category/')
  async getCategories() {
    try {
      return await this.getProductCategories.execute();
    } catch (err: any) {
      return responseError(err);
    }
  }
}
