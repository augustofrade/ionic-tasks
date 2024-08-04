import { Drivers, Storage } from '@ionic/storage';

import { Task } from '../types/interfaces';

interface TaskListingFilter {
    completed?: boolean;
    date?: Date;
}

// TODO: decouple tasks methods from this class
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

    public async getAll(filter?: TaskListingFilter): Promise<Record<string, Task>> {
        const tasks: Record<string, Task> = {};
        await this.storage.forEach(((value, key, index) => {
            // if(filter?.completed != undefined) {
                
            // } else {
                tasks[key] = value;
            // }
        }));
        return tasks;
    }

    public getAllFromToday() {
        return this.getAll({
            completed: false,
            date: new Date()
        });
    }

    public get(id: string) {

    }

    public set(date: Date, info: Task) {
        const id = date.getTime().toString();
        info.completed = false;
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