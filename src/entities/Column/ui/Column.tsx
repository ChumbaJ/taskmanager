'use client'

import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import cls from './Column.module.scss';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/providers/StoreProvider/config/store";
import { addTaskActions } from "@/features/AddTaskForm/model/slice/addTaskFormSlice";

interface ColumnProps {
    children?: React.ReactNode;
    label: 'To do' | 'In progress' | 'Done' | 'Frozen';
}

export const Column = (props: ColumnProps) => {
    const { children, label } = props;
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const handleOpenAddTaskForm = () => dispatch(addTaskActions.openForm());

    return (
        <Stack className={cls.column}>
            <Box className={cls.column__header}>
                <Typography
                    className={cls.column__label}
                    variant='h6'
                >{label}</Typography>
                {label === 'To do' ? (
                    <IconButton onClick={handleOpenAddTaskForm}>
                        <AddCircleIcon
                            sx={{
                                color: theme.palette.mode === 'dark'
                                ? theme.palette.primary.dark
                                : theme.palette.primary.dark
                            }}
                        />
                    </IconButton>
                ) : (
                    null
                )}
            </Box>
            { children }
        </Stack>
    );
}