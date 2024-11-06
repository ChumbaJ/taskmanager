import { apiSlice } from '@/shared/api/apiSlice'
import { ApiResponse } from '@/shared/types/api'
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
        })
    })
})

export const { useGetTasksQuery, useCreateTaskMutation } = apiSliceWithTasks;