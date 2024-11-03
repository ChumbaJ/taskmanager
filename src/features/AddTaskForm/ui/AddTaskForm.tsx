'use client'

import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskActions } from '../model/slice/addTaskFormSlice';
import { getAddTaskFormOpenState } from '../model/selectors/getAddTaskForm';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/FormElements/Input/Input';

interface AddTaskFormProps {}

interface AddTaskFormData {
	name: string,
	date: string,
}

const defaultValues: AddTaskFormData = {
	name: '',
	date: '',
}

export const AddTaskForm = (props: AddTaskFormProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const addTaskFormOpenState = useSelector(getAddTaskFormOpenState);

	const methods = useForm<AddTaskFormData>({ defaultValues });

	const onSubmit = (formData: AddTaskFormData) => {
		console.log({ newTask: formData });
	}

	const handleCloseForm = () => dispatch(addTaskActions.closeForm());

    return (
        <Dialog
			open={addTaskFormOpenState}
			onClose={handleCloseForm}
		>
            <DialogTitle>Создать задание</DialogTitle>
            <DialogContent>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<Input
							name='name'
							autoFocus
							fullWidth
							label='Имя задания'
							variant='outlined'
							margin='normal'
							registerOptions={{ required: true }}
						/>
						<Input
							name='date'
							fullWidth
							label='Дата окончания'
							type='date'
							variant='outlined'
							margin='normal'
							slotProps={{
								inputLabel: {
									shrink: true
								}
							}}
						/>
						<DialogActions>
							<Button onClick={handleCloseForm} color='primary'>
								Отмена
							</Button>
							<Button type='submit' color='primary'>
								Сохранить
							</Button>
						</DialogActions>
					</form>
				</FormProvider>
            </DialogContent>
        </Dialog>
    );
};
