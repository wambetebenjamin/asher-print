import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createHash } from "node:crypto";
import { getUser } from "@/lib/store-kv";

export function hashPassword(password: string): string {
  const pepper = process.env.NEXTAUTH_SECRET || "asher-print-dev";
  return createHash("sha256").update(`${pepper}:${password}`).digest("hex");
}

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

providers.push(
  Credentials({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = String(credentials?.email || "").toLowerCase();
      const password = String(credentials?.password || "");
      if (!email || !password) return null;
      const user = await getUser(email);
      if (!user) return null;
      if (user.passwordHash !== hashPassword(password)) return null;
      return { id: user.id, name: user.name, email: user.email };
    },
  }),
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
