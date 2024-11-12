import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID || "",
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
        client: { token_endpoint_auth_method: "client_secret_post" },
        issuer: "https://www.linkedin.com",
        profile: (profile: LinkedInProfile) => ({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }),
        wellKnown:
          "https://www.linkedin.com/oauth/.well-known/openid-configuration",
        authorization: {
          params: {
            scope: "openid profile email",
          },
        },
      }),
      // LinkedInProvider({
      //   clientId: process.env.LINKEDIN_CLIENT_ID || "",
      //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      //   name: "LinkedIn",
      //   id: "LinkedIn",
      //   client: { token_endpoint_auth_method: "client_secret_post" },
      //   issuer: "https://www.linkedin.com",
      //   userinfo: {
      //     url: "https://api.linkedin.com/v2/userinfo",
      //   },
      //   wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      //   authorization: {
      //     url: "https://www.linkedin.com/oauth/v2/authorization",
      //     params: {
      //       scope: "profile email openid",
      //       // prompt: "consent",
  
      //       access_type: "offline",
      //       response_type: "code",
      //     },
      //   },
      //   token: {
      //     url: "https://www.linkedin.com/oauth/v2/accessToken",
      //   },
      //   jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      //   profile(profile, tokens) {
      //     const defaultImage =
      //       "https://cdn-icons-png.flaticon.com/512/174/174857.png";
      //     return {
      //       id: profile.sub,
      //       name: profile.name,
      //       email: profile.email,
      //       image: profile.picture ?? defaultImage,
      //     };
      //   },
      // }),
    ],
  
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === "google" || account?.provider === "linkedin") {
          const { name, email, image } = user;
  
          const data = {
            username: name,
            email: email,
            image: image,
          };
  
          const res = await fetch(process.env.NEXT_PUBLIC_Backend_URL + "/api/users/oauth", {
            method: "POST",
            body: JSON.stringify({
              data,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          
          // const res = await axios.post(Backend_URL + "/api/users/login", data);
          // if (!res.ok) {
          //   alert(res.statusText);
          //   //console.log("I am failed")
          //   return false;
          // }
          // const response = await res.json();
          // alert("User Registered!");
          // //console.log({ response });
        }
        return true;
      },
  
     
  
      // async jwt({ token, user }) {
      //   if (user) return { ...token, ...user };
  
      //   // if (new Date().getTime() < token.backendTokens?.expiresIn) return token;
  
      //   // return await refreshToken(token);
      //   return token
      // },
  
      // async session({ token, session }) {
      //   session.user = token.user as { name?: string; email?: string; image?: string };;
      //   // session.backendTokens = token.backendTokens;
  
      //   return session;
      // },
    },
    // pages:{
    //   signIn:'/logintest'
    // },
  };