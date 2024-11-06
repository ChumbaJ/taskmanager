import axios from 'axios';

const generateAxios = (contentType: string) => {
    const api = axios.create({
        baseURL: process.env.NEXTAUTH_URL,
        headers: {
            'Content-Type': contentType,
        }
    });
    
    return api;
}

export const $api = generateAxios('application/json');