import { StoreSchema } from '@/app/providers/StoreProvider/config/StoreSchema';

export const getAllTasks = (state: StoreSchema) => state.task.tasks;