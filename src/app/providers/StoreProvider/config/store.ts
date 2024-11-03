import { addTaskReducer } from "@/features/AddTaskForm/model/slice/addTaskFormSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        addTaskForm: addTaskReducer
    },
});

export type AppDispatch = typeof store.dispatch;