import { Priority } from "./enums";

export interface Task {
    title: string;
    description: string;
    priority?: Priority;
    date?: Date;
    labels?: string[]; // TODO: add label
    reminder?: boolean;
    completed?: boolean;
}

export interface TaskItem {
    id: string;
    title: string;
    description: string;
    priority?: Priority;
    date?: Date;
}