import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }
}

export {};