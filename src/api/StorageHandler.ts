import { Drivers, Storage } from '@ionic/storage';

import { Task } from '../types/interfaces';

export class StorageHandler {
    private static _instance: StorageHandler;
    private readonly storage: Storage;

    private constructor() {
        this.storage = new Storage({
            name: '__taskapp',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        this.storage.create();
    }

    public async getAll() {
        const tasks: Record<string, any> = {};
        await this.storage.forEach(((key: string, value, index) => {
            tasks[key] = value;
        }));
        return tasks;
    }

    public getAllFromDate(date: Date) {

    }

    public get(id: string) {

    }

    public set(date: Date, info: Task) {
        const id = date.getTime().toString();
        return this.storage.set(id, info);
    }

    public remove(id: string) {

    }

    public clear() {
        
    }

    public static instance() {
        if(!StorageHandler._instance) {
            StorageHandler._instance = new StorageHandler();
        }
        return StorageHandler._instance;
    }
}