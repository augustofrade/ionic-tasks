import { Priority } from "./enums";

export interface TaskReminder {
    enabled: boolean;
    date: string;
}

export interface Task {
    title: string;
    description: string;
    priority?: Priority;
    date?: string;
    labels?: string[]; // TODO: add label
    completed?: boolean;
    reminder?: TaskReminder;
}

export interface SavedTask extends Task {
    id: string;
    completed: boolean;
}