import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import {firebaseAuth} from "../../../firebase/firebase";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@contract.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email, password} = credentials;
        const signIn = await signInWithEmailAndPassword(firebaseAuth,email, password);
        const user = await signIn.user;
        if (user) {
          return user
        } else {
          throw new Error('Invalid User Credential')
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session:{
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 365, // 365 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        { user, account, profile, email, credentials }
      );

return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const newToken=token;
      if (user) {
        newToken.accessToken = account?.access_token;
        newToken.user = user;
      }

return newToken;
    },
    async session({ session, user, token }) {
      const  newSession = session;
      if (token?.user) {
        newSession.user = token.user;
        newSession.accessToken = token.accessToken
      }

return newSession;
    },
  }
}

export default NextAuth(authOptions)
