'use client'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useState, createContext } from 'react';

declare module '@mui/material/styles' {
    interface TypeBackground {
        block?: string
    }
}

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
            default: '#0D0D0D', // Цвет фона
            paper: '#20252E', // Цвет бумаги (для карточек и других компонентов)
            block: '#151515',
        },
        text: {
            primary: '#ffffff', // Основной цвет текста
            secondary: '#b0bec5', // Вторичный цвет текста
        },
        // Дополнительные цвета, если необходимо
        error: {
            main: '#EA5B5B', // Цвет для ошибок
        },
        warning: {
            main: '#FFA34D', // Цвет для предупреждений
        },
        info: {
            main: '#29b6f6', // Цвет для информации
        },
        success: {
            main: '#7AD278', // Цвет для успеха
        },
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(255, 255, 255, 0.1)', // shadows[1]
        '0px 4px 8px rgba(255, 255, 255, 0.12)', // shadows[2]
        '0px 6px 12px rgba(255, 255, 255, 0.15)', // shadows[3]
        '0px 4px 12px rgba(255, 255, 255, 0.2)', // shadows[4] — кастомная тень
        'none', 'none', 'none', 'none', 'none', // shadows[5-9]
        'none', 'none', 'none', 'none', 'none', // shadows[10-14]
        'none', 'none', 'none', 'none', 'none', // shadows[15-19]
        'none', 'none', 'none', 'none', 'none'  // shadows[20-24]
    ]
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
            paper: '#E0E4EA', // Цвет бумаги (например, для карточек)
            block: '#F6F6F6',
        },
        text: {
            primary: '#000000', // Основной цвет текста
            secondary: '#757575', // Вторичный цвет текста
        },
        // Дополнительные цвета
        error: {
            main: '#E74444', // Цвет для ошибок
        },
        warning: {
            main: '#FF9533', // Цвет для предупреждений
        },
        info: {
            main: '#2196f3', // Цвет для информации
        },
        success: {
            main: '#67CB65 ', // Цвет для успеха
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

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProviderWrapper')
    }

    return context;
}

export default ThemeProviderWrapper;