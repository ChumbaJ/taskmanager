import { getServerSession, NextAuthOptions } from 'next-auth';
import { authOptions } from './route';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export const config = authOptions satisfies NextAuthOptions;

export function auth(
    ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
    return getServerSession(...args, config);
}