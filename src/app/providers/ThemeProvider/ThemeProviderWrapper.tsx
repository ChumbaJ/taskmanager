'use client'

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface ThemeContextType {
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const darkMode = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Основной цвет (например, фиолетовый)
        },
        secondary: {
            main: '#03dac6', // Вторичный цвет (например, бирюзовый)
        },
        background: {
            default: '#121212', // Цвет фона
            paper: '#1e1e1e', // Цвет бумаги (для карточек и других компонентов)
        },
        text: {
            primary: '#ffffff', // Основной цвет текста
            secondary: '#b0bec5', // Вторичный цвет текста
        },
        // Дополнительные цвета, если необходимо
        error: {
            main: '#cf6679', // Цвет для ошибок
        },
        warning: {
            main: '#ffb74d', // Цвет для предупреждений
        },
        info: {
            main: '#29b6f6', // Цвет для информации
        },
        success: {
            main: '#66bb6a', // Цвет для успеха
        },
    },
})

const lightMode= createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'white',
                    color: 'black'
                }
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#9c27b0', // Сиреневый цвет (основной)
            light: '#d05ce3', // Светлый вариант основного цвета
            dark: '#6a0080', // Темный вариант основного цвета
        },
        secondary: {
            main: '#f44336', // Красный цвет (вторичный)
            light: '#ff7961', // Светлый вариант вторичного цвета
            dark: '#ba000d', // Темный вариант вторичного цвета
        },
        background: {
            default: '#ffffff', // Цвет фона
            paper: '#f3e5f5', // Цвет бумаги (например, для карточек)
        },
        text: {
            primary: '#212121', // Основной цвет текста
            secondary: '#757575', // Вторичный цвет текста
        },
        // Дополнительные цвета
        error: {
            main: '#f44336', // Цвет для ошибок
        },
        warning: {
            main: '#ffb74d', // Цвет для предупреждений
        },
        info: {
            main: '#2196f3', // Цвет для информации
        },
        success: {
            main: '#4caf50', // Цвет для успеха
        },
    },
});

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const theme = mode === 'dark' ? darkMode : lightMode;

    return (
            <ThemeContext.Provider value={{ mode, setMode }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
    )
 
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProviderWrapper')
    }

    return context;
}

export default ThemeProviderWrapper;