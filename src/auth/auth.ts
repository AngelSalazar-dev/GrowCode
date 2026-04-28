import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Obtenemos el rol directamente del usuario de la base de datos (usado por el adapter)
        session.user.role = (user as any).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // Podríamos añadir una página de onboarding aquí
  },
})
