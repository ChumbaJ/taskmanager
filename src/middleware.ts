import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login',
        signOut: '/login',
        newUser: '/signup',
    },
});

export const config = { matcher: ['/', '/task'] };