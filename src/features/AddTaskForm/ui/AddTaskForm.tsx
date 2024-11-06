'use client';

import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskActions } from '../model/slice/addTaskFormSlice';
import { getAddTaskFormOpenState } from '../model/selectors/getAddTaskForm';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/FormElements/Input/Input';
import { useCreateTaskMutation } from '@/entities/Task/api/taskApi';
import { Prisma } from '@prisma/client';


type PrismaTask = Prisma.TaskCreateInput;

type AddTaskFormData = Pick<PrismaTask, 'name' | 'endDate'>

const defaultValues: AddTaskFormData = {
    name: '',
    endDate: '',
};

export const AddTaskForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const addTaskFormOpenState = useSelector(getAddTaskFormOpenState);

    const [ createTask ] = useCreateTaskMutation();

    const methods = useForm<AddTaskFormData>({ defaultValues });

    const handleCloseForm = () => dispatch(addTaskActions.closeForm());

    const onSubmit = async (formData: AddTaskFormData) => {
        const endDate = formData.endDate ? new Date(formData.endDate) : null;
        await createTask({
            ...formData,
            endDate,
        });
        handleCloseForm();
    }


    return (
        <Dialog open={addTaskFormOpenState} onClose={handleCloseForm}>
            <DialogTitle>Создать задание</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input
                            name="name"
                            autoFocus
                            fullWidth
                            label="Имя задания"
                            variant="outlined"
                            margin="normal"
                            registerOptions={{ required: true }}
                        />
                        <Input
                            name="endDate"
                            fullWidth
                            label="Дата окончания"
                            type="date"
                            variant="outlined"
                            margin="normal"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseForm} color="primary">
                                Отмена
                            </Button>
                            <Button type="submit" color="primary">
                                Сохранить
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
