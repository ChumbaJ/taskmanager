import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/db/prisma';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'e-mail', type: 'text', placeholder: 'example@mail.com' },
                password: { label: 'password', type: 'text', placeholder: 'yourpassword' },
            },
            async authorize(credentials) {
                const { email, password } = credentials!;

                try {
                    const user = await prisma.user.findUniqueOrThrow({ where: { email }}, );

                    const passwordCorrect = await bcrypt.compare(password, user.password);

                    if (passwordCorrect) {
                        return user;
                    } else {
                        return null;
                    }

                } catch (error) {
                    console.log('User not found');
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        newUser: '/signup',
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },
        async jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = token.user;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };