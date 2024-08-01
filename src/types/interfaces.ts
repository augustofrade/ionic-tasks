import { Priority } from "./enums";

export interface Task {
    title: string;
    description: string;
    priority?: Priority;
    date?: Date;
    labels?: string[]; // TODO: add label
    reminder?: boolean;
}