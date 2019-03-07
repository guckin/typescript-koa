import config from '../config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { Cat } from '../models/cat.model';
import { CatStore } from '../types/catstore.types';
import * as log from '../logger';

export class CatStoreService implements CatStore {
    private readonly dataMapper: DataMapper;

    constructor(dataMapper: DataMapper) {
        this.dataMapper = dataMapper;
    }

    public async createCat(id: string, name: string): Promise<object> {
        const cat = new Cat();
        cat.name = name;
        cat.id = id;
        return await this.dataMapper.put(cat);
    }

    public async retrieveCat(id: string): Promise<object> {
        const cat = new Cat
        cat.id = id;
        return await this.dataMapper.get(cat);
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
