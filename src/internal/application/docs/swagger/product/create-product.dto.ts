import { ApiProperty } from '@nestjs/swagger';


class CategorySwagger {
    @ApiProperty({ description: 'The ID of the category.' })
    id: string;
  
    @ApiProperty({ description: 'The name of the category.' })
    name: string;
  
    @ApiProperty({ description: 'The description of the category.' })
    description: string;
  }

export class CreateProductSwagger {
    @ApiProperty({ description: 'The name of the product.' })
    name: string;

    @ApiProperty({ description: 'The description of the product.' })
    description: string;

    @ApiProperty({ description: 'The categoryId of the product.' })
    categoryId: string;

    @ApiProperty({ description: 'The price of the product.' })
    price: number;

    @ApiProperty({ description: 'The quantity of the product available.' })
    quantity: number;
}

export class CreatedProductSwagger {
    @ApiProperty({ description: 'The unique identifier of the product.' })
    id: string;

    @ApiProperty({ description: 'The name of the product.' })
    name: string;

    @ApiProperty({ description: 'The description of the product.' })
    description: string;

    @ApiProperty({ description: 'The category of the product.' })
    category: string;

    @ApiProperty({ description: 'The price of the product.' })
    price: number;

    @ApiProperty({ description: 'The quantity of the product available.' })
    quantity: number;
}

export class EditProductSwagger {
    @ApiProperty({ description: 'The name of the product.' })
    name: string;

    @ApiProperty({ description: 'The description of the product.' })
    description: string;

    @ApiProperty({ description: 'The categoryId of the product.' })
    categoryId: string;

    @ApiProperty({ description: 'The price of the product.' })
    price: number;
}

export class LoadedCategoriesSwagger {
    @ApiProperty({ 
        description: 'List of Categories.', 
        type: [CategorySwagger]
    })
    categories: CategorySwagger[];
}

export class LoadedProductsByCategorySwagger {
    @ApiProperty({ 
        description: 'List of products by categories.', 
        type: [CreatedProductSwagger]
    })
    products: CreatedProductSwagger[];
}