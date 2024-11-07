import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { ITask } from '@/entities/Task/model/types/TaskSchema';
import { Priority, TaskStatus } from '@prisma/client';
import { Input } from '@/shared/ui/FormElements/Input/Input';
import { FormProvider, useForm } from 'react-hook-form';

interface EditTaskModalProps {
    open?: boolean;
    onClose?: () => void;
    task?: ITask;
    onSave?: (updatedTask: ITask) => void;
}

interface IEditTask extends ITask {}

const defaultValues: IEditTask = {
    name: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    endDate: '',
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, onClose, task, onSave }) => {
    const methods = useForm<IEditTask>({ defaultValues });

    const onSubmit = (formData: IEditTask) => {
        console.log(formData);
    };

    return (
        <Modal open={false} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    mx: 'auto',
                    mt: 5,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Task
                </Typography>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input 
                            label="Name" 
                            name="name" 
                            fullWidth 
                            required
                            margin="normal"
                        />

                        <Input 
                            label="Description" 
                            name="description" 
                            fullWidth 
                            margin="normal"
                            multiline 
                            rows={3} 
                        />

                        <Input 
                            margin="normal" 
                            select 
                            label="Status" 
                            name="status" 
                            fullWidth
                        >
                            {Object.values(TaskStatus).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Input>

                        <Input 
                            select 
                            label="Priority" 
                            name="priority" 
                            fullWidth
                            margin="normal"
                        >
                            {Object.values(Priority).map((priority) => (
                                <MenuItem key={priority} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Input>

                        <Input
                            label="End Date"
                            name="endDate"
                            fullWidth
                            type="date"
                            margin="normal"
                            placeholder="YYYY-MM-DD"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <Input 
                            name="createdAt" 
                            label="Created At" 
                            fullWidth 
                            variant="standard" 
                            disabled
                            margin="normal"
                        />

                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button onClick={onClose} color="secondary" sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </Modal>
    );
};
