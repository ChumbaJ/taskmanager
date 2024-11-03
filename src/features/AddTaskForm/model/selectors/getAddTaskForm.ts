import { StoreSchema } from '@/app/providers/StoreProvider/config/StoreSchema';

export const getAddTaskFormOpenState = (state: StoreSchema) => state.addTaskForm.open;
