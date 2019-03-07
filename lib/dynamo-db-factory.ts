
import * as AWS from 'aws-sdk';
import config from './config';

export default class DynamoDBFactory {

  static readonly localOptions: AWS.DynamoDB.ClientConfiguration = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'foo',
    sessionToken: 'bar',
    secretAccessKey: 'foobar'
  };

  static readonly cloudOptions: AWS.DynamoDB.ClientConfiguration = {
    region: config.aws.dynamoDb.region
  };

  static getInstance(): AWS.DynamoDB {
    return config.aws.isLocal
    ? new AWS.DynamoDB( this.localOptions )
    : new AWS.DynamoDB( this.cloudOptions );
  }
}
