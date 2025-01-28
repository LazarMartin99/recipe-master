// scripts/delete-table.ts
import { DeleteTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function deleteTable() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION
  });

  try {
    const response = await client.send(
      new DeleteTableCommand({
        TableName: 'recipes'
      })
    );
    console.log('Table deleted successfully:', response.TableDescription?.TableName);
  } catch (error) {
    console.error('Error deleting table:', error);
  }
}

deleteTable();