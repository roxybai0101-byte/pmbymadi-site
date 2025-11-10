import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { verify } from "argon2";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const { handlers: authHandlers, signIn, signOut, auth } = NextAuth({
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Неверные данные для входа");
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          throw new Error("Неверный email или пароль");
        }

        const isValid = await verify(user.password, password);

        if (!isValid) {
          throw new Error("Неверный email или пароль");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as string) ?? "ADMIN";
      }

      return session;
    }
  }
});
