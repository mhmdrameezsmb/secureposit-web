import { API } from "@/lib/fetch";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "./authOption";

/**
 *
 * @param {JWT} token
 */

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
