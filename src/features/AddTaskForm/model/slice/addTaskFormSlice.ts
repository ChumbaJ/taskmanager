import { createSlice } from "@reduxjs/toolkit";
import { AddTaskFormSchema } from "../types/addTaskType";

const initialState: AddTaskFormSchema = {
    open: false
}

const addTaskFormSlice = createSlice({
    name: 'addTaskFormSlice',
    initialState,
    reducers: {
        openForm(state) {
            state.open = true;
        },
        closeForm(state) {
            state.open = false;
        }
    }
});

export const { actions: addTaskActions } = addTaskFormSlice;
export const { reducer: addTaskReducer } = addTaskFormSlice;