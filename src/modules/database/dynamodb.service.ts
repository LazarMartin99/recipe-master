// src/modules/database/dynamodb.service.ts
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'eu-east-1',
    });

    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  getDynamoDBClient(): DynamoDBClient {
    return this.client;
  }

  getDocumentClient(): DynamoDBDocumentClient {
    return this.docClient;
  }
}