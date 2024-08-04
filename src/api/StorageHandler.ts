import { Drivers, Storage } from '@ionic/storage';

import { Task, SavedTask } from '../types/interfaces';
import dayjs from 'dayjs';

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

    public async getAll(filter?: TaskListingFilter): Promise<SavedTask[]> {
        const tasks: SavedTask[] = [];
        await this.storage.forEach(((value: SavedTask, key, index) => {
            tasks.push({ ...value, id: key });
        }));
        if(filter) {
            // TODO: create specific filtering private method
            return tasks.filter(t => {
                return (
                    filter.date == undefined
                    ? true
                    : dayjs(t.date).isSame(filter.date, "day")
                ) &&
                (
                    filter.completed == undefined
                    ? true
                    : filter.completed == t.completed
                )
            });
        } else        
            return tasks;
    }

    public getAllFromToday() {
        return this.getAll({
            date: new Date(),
            completed: false
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