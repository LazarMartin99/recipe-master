// src/modules/recipe/services/ingredient.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DynamoDBService } from '../../database/dynamodb.service';
import { IngredientEntity } from '../entities/ingredient.entity';
import { PutCommand, GetCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class IngredientService {
  private readonly tableName = process.env.DYNAMODB_TABLE || 'recipes';

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  private createIngredientKey(id: string) {
    return {
      PK: `ING#${id}`,
      SK: 'METADATA'
    };
  }

  async findByName(name: string): Promise<IngredientEntity[]> {
    const normalizedName = await this.normalizeIngredientName(name);
    
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI1', // Global Secondary Index a normalized_name-re
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `ING_NAME#${normalizedName}`
      }
    });

    const response = await this.dynamoDBService.getDocumentClient().send(command);
    
    return (response.Items || []).map(item => new IngredientEntity({
      id: item.PK.split('#')[1],
      name: item.name,
      normalized_name: item.normalized_name,
      aliases: item.aliases,
      category: item.category,
      unit: item.unit
    }));
  }

  async createIngredient(data: Partial<IngredientEntity>): Promise<IngredientEntity> {
    const id = `${Date.now()}`; // Egyszerű ID generálás
    const normalized_name = await this.normalizeIngredientName(data.name);

    const ingredient = new IngredientEntity({
      ...data,
      id,
      normalized_name
    });

    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...this.createIngredientKey(id),
        GSI1PK: `ING_NAME#${normalized_name}`,
        name: ingredient.name,
        normalized_name: ingredient.normalized_name,
        aliases: ingredient.aliases || [],
        category: ingredient.category,
        unit: ingredient.unit,
        type: 'ingredient'
      }
    });

    await this.dynamoDBService.getDocumentClient().send(command);
    
    return ingredient;
  }

  async getIngredientById(id: string): Promise<IngredientEntity> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: this.createIngredientKey(id)
    });

    const response = await this.dynamoDBService.getDocumentClient().send(command);
    
    if (!response.Item) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return new IngredientEntity({
      id: response.Item.PK.split('#')[1],
      name: response.Item.name,
      normalized_name: response.Item.normalized_name,
      aliases: response.Item.aliases,
      category: response.Item.category,
      unit: response.Item.unit
    });
  }

  async deleteIngredient(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: this.createIngredientKey(id)
    });

    await this.dynamoDBService.getDocumentClient().send(command);
  }

    private async normalizeIngredientName(name: string): Promise<string> {
    if (!name) return '';
    
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')                 // Ékezetek kezelése
      .replace(/[\u0300-\u036f]/g, '') // Ékezetek eltávolítása
      .replace(/[^a-z0-9\s]/g, '')     // Csak betűk, számok és szóközök maradnak
      .replace(/\s+/g, ' ')            // Többszörös szóközök egyszerűsítése
      .trim();
  }
}