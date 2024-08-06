import { Priority } from "./enums";

export interface Task {
    title: string;
    description: string;
    priority?: Priority;
    date?: string;
    labels?: string[]; // TODO: add label
    reminder?: boolean;
    completed?: boolean;
}

export interface SavedTask extends Task {
    id: string;
    completed: boolean;
}