import React from 'react';
import { Box, Typography, TextField, Button, MenuItem, Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export const TaskEditPage = () => {
    return (
        <Box display="flex" gap={4} padding={4}>
            {/* Left Column: Task Actions */}
            <Box flex={1}>
                <Typography variant="h6" gutterBottom>Actions</Typography>
                <Stack spacing={2}>
                    <Box p={2} borderRadius={2} bgcolor="#f5f5f5">
                        <Typography variant="subtitle1">CRM system design</Typography>
                        <Typography variant="body2">Activity: 12/04/2021, 6:37 p.m.</Typography>
                        <Typography variant="body2">Приступил(-а) к задаче</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} marginTop={1}>
                            <Avatar alt="Azhar" src="path-to-avatar" />
                            <Typography>Azhar</Typography>
                        </Stack>
                    </Box>
                    {/* Repeat the above Box for each action item */}
                </Stack>
            </Box>

            {/* Middle Column: Task Details and Comments */}
            <Box flex={2}>
                <Typography variant="body1" gutterBottom>
                    Добавить статистику по задачам, часам. Сделать сбор статистики за текущий месяц и создание уведомления в последний день месяца.
                </Typography>
                
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Комментарий..."
                    variant="outlined"
                    margin="normal"
                />
                
                <Button variant="contained" color="warning" fullWidth>
                    Опубликовать
                </Button>

                {/* Existing Comments */}
                <Box mt={4}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                        <Avatar alt="Artur" src="path-to-avatar" />
                        <Box>
                            <Typography variant="body2" fontWeight="bold">Artur</Typography>
                            <Typography variant="body2" color="textSecondary">12/04/2021, 6:37 p.m.</Typography>
                        </Box>
                    </Stack>
                    <Typography variant="body2" mb={2}>
                        1. Добавлены шаблонные теги для подсчёта часов, потраченных на закрытие задачи.
                    </Typography>
                </Box>
            </Box>

            {/* Right Column: Task Info and Actions */}
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
                <Box>
                    <Typography variant="subtitle1">Priority: <span style={{ color: 'green' }}>Low</span></Typography>
                    <Typography variant="subtitle1">Status: Frozen</Typography>
                    <Typography variant="subtitle1">Date added: 12/04/2021</Typography>
                    <Typography variant="subtitle1">Deadline: 21/04/2021</Typography>
                    <Typography variant="subtitle1">Participants: Adyl, Azhar, Arthur</Typography>
                </Box>

                <TextField select label="Change the priority" fullWidth>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </TextField>
                
                <TextField select label="Change the task type" fullWidth>
                    <MenuItem value="Task">Task</MenuItem>
                    <MenuItem value="Bug">Bug</MenuItem>
                    <MenuItem value="Feature">Feature</MenuItem>
                </TextField>

                <Button variant="contained" color="success" fullWidth>
                    Become a participant
                </Button>

                <Button variant="contained" color="info" fullWidth startIcon={<AcUnitIcon />}>
                    Freeze the task
                </Button>

                <Button variant="contained" color="error" fullWidth startIcon={<CheckCircleIcon />}>
                    Close task
                </Button>
            </Box>
        </Box>
    );
};
