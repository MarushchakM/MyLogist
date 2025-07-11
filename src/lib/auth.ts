import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { type User } from '@prisma/client';
import { signInPath } from '@/paths';

export const { auth, handlers, signIn } = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {}
    },
    authorize: async  (credentials) => {
      const email = credentials.email as string;
      const password = credentials.password as string;

      if (!email || !password) {
        throw new Error('Будь ласка, введіть email та пароль.');
      }

       const user = await prisma.user.findUnique({
        where: { email },
       });
      
      if (!user) {
        throw new Error('Користувача з таким email не знайдено.');
      }

      if (!user.password) {
        throw new Error('Користувач не має встановленого пароля.');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return {
        ...user,
        avatarUrl: user.avatarUrl ?? '',
      };
      } else {
        throw new Error('Невірний пароль.');
      }
    }
  })],
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as User;
        
        token.id = typedUser.id;
        token.role = typedUser.role;
        token.firstName = typedUser.firstName;
        token.lastName = typedUser.lastName;
        token.avatarUrl = typedUser.avatarUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          avatarUrl: token.avatarUrl as string,
        };
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: signInPath(),
  }
});