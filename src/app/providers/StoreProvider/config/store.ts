import { taskReducer } from "@/entities/Task/model/slice/taskSlice";
import { addTaskReducer } from "@/features/AddTaskForm/model/slice/addTaskFormSlice";
import { apiSlice } from "@/shared/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        addTaskForm: addTaskReducer,
        task: taskReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;