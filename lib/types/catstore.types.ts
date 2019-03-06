export interface CatStore {
    createCat(id: string, name: string): Promise<object>;
    retrieveCat(id: string): Promise<object>;
    ensureTableExists(): Promise<void>;
}
