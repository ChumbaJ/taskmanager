import { Box, Stack, Typography } from "@mui/material";
import cls from './Column.module.scss';

interface ColumnProps {
    children?: React.ReactNode;
    label: string
}

export const Column = (props: ColumnProps) => {
    const { children, label } = props;

    return (
        <Stack className={cls.column}>
            <Box className={cls.column__header}>
                <Typography
                    className={cls.column__label}
                    variant='h6'
                >{label}</Typography>
            </Box>
            { children }
        </Stack>
    );
}