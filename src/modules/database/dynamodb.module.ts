// src/modules/database/database.module.ts
import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';

@Module({
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class DatabaseModule {}