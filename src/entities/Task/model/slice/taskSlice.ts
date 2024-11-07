import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, TaskSchema } from "../types/TaskSchema";

const initialState: TaskSchema = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        }
    }
});

export const { actions: taskActions } = taskSlice;
export const { reducer: taskReducer } = taskSlice;