import { Card, CardActionArea, CardContent, Box, Typography, Chip } from '@mui/material';
import cls from './Task.module.scss';

interface TaskProps {}

export default function Task(props: TaskProps) {
    return (
        <Card className={cls.card}>
            <CardActionArea className={cls.card__actionArea}>
                <Box className={cls.card__header}>
                    <Typography
                        className={cls.card__title}
                        variant='body1'
                    >Задание</Typography>
                    <Chip
                        className={cls.chip}
                        label='Priority'
                        variant='filled'
                    />
                </Box>
                <CardContent className={cls.card__content}>
                    <Box className={cls.card__box}>
                        <Typography className={cls.card__box__title}>Participant:</Typography>
                        <Typography className={cls.card__box__content}>Name</Typography>
                    </Box>
                    <Box className={cls.card__box}>
                        <Typography className={cls.card__box__title}>Date added:</Typography>
                        <Typography className={cls.card__box__content}>00/00/0000</Typography>
                    </Box>
                    <Box className={cls.card__box}>
                        <Typography className={cls.card__box__title}>Date end:</Typography>
                        <Typography className={cls.card__box__content}>00/00/0000</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
