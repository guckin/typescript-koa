import config from '../config';
import { DataMapper, ItemNotFoundException } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { Cat } from '../models/cat.model';
import DynamoDBFactory from '../dynamo-db-factory';
import { CatStore } from '../types/catstore.types';
import * as log from '../logger';

export class CatStoreService implements CatStore {
    private readonly dataMapper: DataMapper;

    constructor() {
        const dynamoInstance: DynamoDB = DynamoDBFactory.getInstance();
        this.dataMapper = new DataMapper( {
            client: dynamoInstance,
            tableNamePrefix: config.aws.dynamoDb.tablePrefix
        });
    }

    public async createCat(id: string, name: string): Promise<object> {
    //   const data = { id: id, name: name };
    //   const cat = Object.assign(new Cat, data);
        const cat = new Cat();
        cat.name = name;
        cat.id = id;
        const data = await this.dataMapper.put(cat);
        return data;
    }

    public async retrieveCat(id: string): Promise<object> {
        // same here ^
        const data = { id: id };
        const catData = Object.assign(new Cat, data);
        const cat = await this.dataMapper.get(catData);   
        return cat;
    }

    public async ensureTableExists(): Promise<void> {
        try {
            await this.dataMapper.ensureTableExists(Cat, {
                readCapacityUnits: 5,
                writeCapacityUnits: 5
            });
        }catch (err){
            log.error(err);
        }
    }
}
