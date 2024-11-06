import { Card, CardActionArea, CardContent, Box, Typography, Chip } from '@mui/material';
import cls from './Task.module.scss';
import { ITask } from '../model/types/TaskSchema';

export const Task = ({ task }: { task: ITask }) => {
    return (
        <Card className={cls.card}>
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
