import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectionPool from "@/utils/supabase/connectionPool";
import * as bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        console.log("fetching: ", JSON.stringify(credentials));

        const result = await connectionPool.query(
          `SELECT * FROM users WHERE user_email = $1`,
          [credentials.email]
        );

        if (result.rowCount === 0) {
          return null;
        }

        const user = await result.rows[0];
        const validPassword = await bcrypt.compare(
          credentials.password,
          user.user_password
        );
        if (!validPassword) {
          return null;
        }
        console.log("user: ", user);

        //   const { user_password, ...userData } = user;
        return {
          id: user.user_id,
          name: `${user.user_firstname} ${user.user_lastname}`,
          email: user.user_email,
          image: user.user_image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id || null;
        session.user.name = token.name || null;
        session.user.email = token.email || null;
        session.user.image = token.image || null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};
