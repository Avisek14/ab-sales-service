import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { msg91VerifyOtp } from "@/lib/msg91";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/dashboard/login" },
  providers: [
    CredentialsProvider({
      name: "Team OTP login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) return null;

        await connectDB();

        const user = await User.findOne({ phone: credentials.phone });
        if (!user) return null;

        const valid = await msg91VerifyOtp(credentials.phone, credentials.code);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
};