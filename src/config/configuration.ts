export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    aws: {
      region: process.env.AWS_REGION || 'eu-east-1',
      dynamodb: {
        tableName: process.env.DYNAMODB_TABLE || 'recipes',
      },
    },
  });