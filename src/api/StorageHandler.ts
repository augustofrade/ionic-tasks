import { Drivers, Storage } from '@ionic/storage';

import { Task, SavedTask } from '../types/interfaces';
import dayjs from 'dayjs';
import { FilterOptions } from '../types/types';

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

    private filter<T>(data: T[], filter: FilterOptions<T>): T[] {
        const parsedFilter = Object.entries(filter);
        return data.filter(item => {
            let isItemValid = true;
            for(const [key, value] of parsedFilter) {
                if(!isItemValid) break;

                const valueOfKey = item[key as keyof T]
                
                const filterFunction: Function = typeof value == "function" ? value as any : () => valueOfKey === value;
                isItemValid = filterFunction(valueOfKey);
            };
            return isItemValid;
        });
    }

    public async getAll(filter?: FilterOptions<SavedTask>): Promise<SavedTask[]> {
        const tasks: SavedTask[] = [];
        await this.storage.forEach(((value: SavedTask, key, index) => {
            tasks.push({ ...value, id: key });
        }));
        if(filter) {
            return this.filter(tasks, filter);
        } else        
            return tasks;
    }

    public getAllFromToday() {
        return this.getAll({
            completed: false,
            date: (value) => value != undefined && dayjs(new Date()).isSame(value, "day"),

        });
    }

    public get(id: string): Promise<SavedTask> {
        return this.storage.get(id);
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