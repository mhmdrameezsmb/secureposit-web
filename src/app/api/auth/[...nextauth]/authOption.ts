import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshAccessToken = async (token: JWT) => {
  try {
    const { data, error } = await API.Post(
      "auth/token",
      {
        token: token.user.accessToken,
        refresh_token: token.user.refreshToken,
      },
      undefined,
      { auth: false }
    );
    if (error || !data) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
    return {
      ...token,
      user: {
        ...token.user,
        accessToken: data.token,
        refreshToken: data.refresh_token,
        tokenExpiry: data.token_expiry,
      },
    };
  } catch (e) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        const { data, error } = await API.Post("auth/local", {
          ...credentials,
          role: "Admin",
          info: {},
        });

        console.log({ data, error }, "saj ");

        if (!!error) {
          return null;
        }

        return {
          ...data.user,
          accessToken: data.token,
          refreshToken: data.refresh_token,
          tokenExpiry: data.token_expiry,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
      }
      return session;
    },
    async jwt({ token, user, account, session }) {
      if (account && user) {
        return {
          ...token,
          user,
        };
      }

      // check the token validity
      if (new Date() < new Date(token.user.tokenExpiry)) {
        return token;
      }

      // get new token using refresh token
      return refreshAccessToken(token);
    },
  },
  debug: process.env.NEXT_AUTH_DEBUG === "Y",
};
