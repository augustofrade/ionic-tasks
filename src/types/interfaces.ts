import { Priority } from "./enums";
import { FilterOptions } from "./types";

export interface TaskReminder {
    enabled: boolean;
    date: string;
}

export interface Task {
    title: string;
    description?: string;
    priority?: Priority;
    date?: string;
    completed?: boolean;
    reminder?: TaskReminder;
}

export interface SavedTask extends Task {
    id: string;
    completed: boolean;
}

interface TaskFilter {
    completed?: boolean;
    date?: Date;
}

export interface IRepository<T> {
    getAll(filter?: FilterOptions<T>): Promise<T[]>;
    get(id: string): Promise<T>;
    set(id: string, info: T): Promise<T>;
    remove(id: string): Promise<any>;
    clear(): Promise<any>;
}

export interface ITaskService {
    getAll(filter?: FilterOptions<SavedTask>): Promise<SavedTask[]>;
    get(id: string): Promise<SavedTask>;
    create(info: Task): Promise<SavedTask>;
    changeTaskStatus(id: string, completed: boolean): Promise<any>;
    remove(id: string): Promise<any>;
    clear(): Promise<any>;
}