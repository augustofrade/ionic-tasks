import { Drivers, Storage } from '@ionic/storage';

import { IRepository, SavedTask, Task } from '../types/interfaces';
import { FilterOptions } from '../types/types';
import { filterArray } from '../functions/filterArray';

export class TaskRepository implements IRepository<SavedTask> {
    private static _instance: TaskRepository;
    private readonly storage: Storage;

    private constructor() {
        this.storage = new Storage({
            name: '__taskapp',
            storeName: "tasks",
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        this.storage.create();
    }

    public async getAll(filter?: FilterOptions<SavedTask>): Promise<SavedTask[]> {
        // TODO: measure performance
        // how it's used on home page: (forEach + (filter + for) + map + reverse) = 5 loops)
        const tasks: SavedTask[] = [];
        await this.storage.forEach(((value: SavedTask, key, index) => {
            tasks.push({ ...value, id: key });
        }));
        if(filter) {
            return filterArray(tasks, filter);
        } else        
            return tasks;
    }

    public get(id: string): Promise<SavedTask> {
        return this.storage.get(id);
    }

    public set(id: string, info: Task) {
        return this.storage.set(id, info);
    }

    public remove(id: string) {
        return this.storage.remove(id);
    }

    public clear(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public static instance() {
        if(!TaskRepository._instance) {
            TaskRepository._instance = new TaskRepository();
        }
        return TaskRepository._instance;
    }
}