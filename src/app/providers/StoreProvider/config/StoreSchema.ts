import { TaskSchema } from '@/entities/Task/model/types/TaskSchema';
import { AddTaskFormSchema } from '@/features/AddTaskForm/model/types/addTaskFormSchema';

export interface StoreSchema {
    task: TaskSchema;
    addTaskForm: AddTaskFormSchema;
}
