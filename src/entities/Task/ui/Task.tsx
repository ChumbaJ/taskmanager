'use client'

import { Card, CardActionArea, CardContent, Box, Typography, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import cls from './Task.module.scss';
import { ITask } from '../model/types/TaskSchema';
import { useDeleteTaskMutation } from '../api/taskApi';

export const Task = ({ task }: { task: ITask }) => {
    const [ deleteTask ] = useDeleteTaskMutation();

    const handleDeleteTask = () => deleteTask(task);

    return (
        <Card className={cls.card}>
            <IconButton onClick={handleDeleteTask} className={cls.card__deleteIconButton}>
                <DeleteIcon className={cls.card__deleteIcon}/>
            </IconButton>
            <CardActionArea className={cls.card__actionArea}>
                <Box className={cls.card__header}>
                    <Typography
                        className={cls.card__title}
                        variant='body1'
                    >{task.name}</Typography>
                    <Chip
                        className={cls.chip}
                        label={task.priority}
                        variant='filled'
                    />
                </Box>
                <CardContent className={cls.card__content}>
                    <Box className={cls.card__box}>
                        <Typography className={cls.card__box__title}>Date added:</Typography>
                        <Typography className={cls.card__box__content}></Typography>
                    </Box>
                    <Box className={cls.card__box}>
                        <Typography className={cls.card__box__title}>Date end:</Typography>
                        <Typography className={cls.card__box__content}>{task.endDate?.toISOString()}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
