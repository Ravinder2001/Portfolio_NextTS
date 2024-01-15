import { ENVConfig } from "@/utils/Config";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../../../lib/Database";
import User from "@/models/User";


export const authoptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { username, password } = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          } else if (user?.password == password) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: ENVConfig.nextAuthSecret,
  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST };
