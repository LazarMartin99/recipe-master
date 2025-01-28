import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { tableConfig } from '../src/config/dynamodb-table.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function createTable() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION
  });

  try {
    const response = await client.send(new CreateTableCommand(tableConfig));
    console.log('Table created successfully:', response.TableDescription?.TableName);
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createTable();