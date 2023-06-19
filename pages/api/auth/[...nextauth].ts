import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbUsuarios } from "../../../database";

export default NextAuth({
  providers: [
    Credentials({
      name: "Custom login",
      credentials: {
        correoElectronico: {
          label: "correo",
          type: "email",
          placeholder: "correo@correo.com",
        },
        contrasenia: {
          label: "contraseña",
          type: "password",
          placeholder: "contraseña",
        },
      },
      async authorize(credentials) {
        return await dbUsuarios.checkUserEmailPassword(
          credentials!.correoElectronico,
          credentials!.contrasenia
        );
      },
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/usuarios/login",
    newUser: "/usuarios/register",
  },

  session: {
    maxAge: 2592000,
    strategy: "jwt",
    updateAge: 86400,
  },

  //Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
});
