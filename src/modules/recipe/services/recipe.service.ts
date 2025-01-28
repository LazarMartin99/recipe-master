import { Injectable, NotFoundException } from '@nestjs/common';
import { DynamoDBService } from '../../database/dynamodb.service';
import { RecipeEntity } from '../entities/recipe.entity';
import { SearchRecipeDto } from '../dto/search-recipe.dto';
import { RecipeResponseDto } from '../dto/recipe-response.dto';
import { PutCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class RecipeService {
  private readonly tableName = process.env.DYNAMODB_TABLE || 'recipes';

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  private createRecipeKey(id: string) {
    return {
      PK: `RECIPE#${id}`,
      SK: 'METADATA'
    };
  }

  async createRecipe(data: Partial<RecipeEntity>): Promise<RecipeEntity> {
    const id = `${Date.now()}`; 

    const recipe = new RecipeEntity({
      ...data,
      id,
      createdAt: Date.now()
    });

    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...this.createRecipeKey(id),
        title: recipe.title,
        directions: recipe.directions,
        link: recipe.link,
        source: recipe.source,
        site: recipe.site,
        createdAt: recipe.createdAt,
        type: 'recipe'
      }
    });

    await this.dynamoDBService.getDocumentClient().send(command);
    
    return recipe;
  }

  async getRecipeById(id: string): Promise<RecipeEntity> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: this.createRecipeKey(id)
    });

    const response = await this.dynamoDBService.getDocumentClient().send(command);
    
    if (!response.Item) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return new RecipeEntity({
      id: response.Item.PK.split('#')[1],
      title: response.Item.title,
      directions: response.Item.directions,
      link: response.Item.link,
      source: response.Item.source,
      site: response.Item.site,
      createdAt: response.Item.createdAt
    });
  }

}