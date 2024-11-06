import { ApiResponse } from '@/shared/types/api';
import { apiSlice } from '@/shared/api/apiSlice'
import { ITask } from '../model/types/TaskSchema';

export const apiSliceWithTasks = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query<ApiResponse<ITask[]>, void>({
            query: () => 'task',
            providesTags: ['Task'],
        }),
        createTask: builder.mutation<ApiResponse<ITask>, ITask>({
            query: newTask => ({
                url: 'task',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<ApiResponse<ITask>, ITask>({
            query: task => ({
                url: 'task',
                method: 'DELETE',
                body: task,
            }),
            invalidatesTags: ['Task'],
        })
    })
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = apiSliceWithTasks;