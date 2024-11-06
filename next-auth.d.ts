import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string
    }

    interface Session extends DefaultSession {
        user: User
    }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user?: DefaultUser
    }
}