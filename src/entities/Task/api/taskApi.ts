import { ApiResponse } from '@/shared/types/api';
import { apiSlice } from '@/shared/api/apiSlice'
import { ITask } from '../model/types/TaskSchema';
import { TaskStatus } from '@prisma/client';

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
        }),
        updateTask: builder.mutation<ApiResponse<ITask>, { id: string, task: Partial<ITask> }>({
            query: (data) => ({
                url: 'task',
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, task }, { dispatch, queryFulfilled }) {
                const taskPatchResult = dispatch(
                    apiSliceWithTasks.util.updateQueryData('getTasks', undefined, cache => {
                        const taskToUpdate = cache.data!.find(task => task.id === id)!;

                        Object.assign(taskToUpdate, task);
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    taskPatchResult.undo();
                }
            }
        })
    })
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = apiSliceWithTasks;