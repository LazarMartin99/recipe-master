// src/config/dynamodb-table.config.ts
import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

export const tableConfig: CreateTableCommandInput = {
  TableName: 'recipes',
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S'    // String type
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S'    // String type
    },
    {
      AttributeName: 'GSI1PK',
      AttributeType: 'S'    // String type
    },
    {
      AttributeName: 'GSI1SK',
      AttributeType: 'S'    // String type
    }
  ],
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH'     // Partition key
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE'    // Sort key
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        {
          AttributeName: 'GSI1PK',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'GSI1SK',
          KeyType: 'RANGE'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};