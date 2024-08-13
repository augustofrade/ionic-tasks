import dayjs from "dayjs";
import { TaskRepository } from "../repository/TaskRepository";
import { IRepository, ITaskService, SavedTask, Task } from "../types/interfaces";
import { FilterOptions } from "../types/types";

export class TaskService implements ITaskService {
    private static _instance: TaskService;

    private constructor(
        private repository = TaskRepository.instance()
    ) {}

    public getAll(filter?: FilterOptions<SavedTask>): Promise<SavedTask[]> {
        return this.repository.getAll();
    }

    public getAllFromToday() {
        return this.repository.getAll({
            completed: false,
            date: (value) => value == undefined || dayjs(value).isAfter(new Date(), "day") == false,

        });
    }

    public get(id: string): Promise<SavedTask> {
        return this.repository.get(id);
    }

    public create(info: Task): Promise<SavedTask> {
        const id = new Date().toISOString();
        info.completed = false;
        return this.repository.set(id, info);
    }

    public completeTask(id: string) {
        return this.changeTaskStatus(id, true);
    }

    public restoreTask(id: string) {
        return this.changeTaskStatus(id, false);
    }

    

    public async changeTaskStatus(id: string, completed: boolean) {
        const task = await this.get(id);
        task.completed = completed;
        return await this.repository.set(id, task);
    }

    public remove(id: string): Promise<any> {
        return this.repository.remove(id);
    }

    public clear(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public static instance() {
        if(!TaskService._instance) {
            TaskService._instance = new TaskService();
        }
        return TaskService._instance;
    }

    
}