import NextAuth, { User, type NextAuthOptions } from "next-auth";
import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "inspector";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      authorization:
      'https://accounts.spotify.com/authorize?scope=playlist-modify-public',
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({session, token}) {
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET as string,
};

export default NextAuth(authOptions);
