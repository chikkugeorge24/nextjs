# Authentication

- 3 Types of Authentications:

  - Client side authentication
  - Server side authentication
  - API routes authentication

- **Authentication Providers**
  
  - If we want a full-featured authentication system with built-in providers (Google, Facebook, GitHub…), JWT, JWE, email/password, magic links, need to use **next-auth**.
  - **npm i next-auth** 
  - NextAuth with GitHub Provider
  
    - Create a page: pages/api/auth/[...nextauth].js and paste the below code:

          import NextAuth from "next-auth";
          import Providers from "next-auth/providers";

          export default NextAuth({
            providers: [
              Providers.GitHub({
                clientId: "",
                clientSecret: "",
              }),
            ],
          });
    - To get GitHub clientId and clientSecret, setup GitHub OAuth

      Settings -> Developer Settings -> OAuth Apps -> Register OAuth Application -> Generate Client Secret
    - Create .env file and use client Id and client Secret there
    - http://localhost:3000/api/auth/signin will redirect to the default signin page provided by github. This will set a token **next-auth.session-token** in cookies. http://localhost:3000/api/auth/signout will signout from the page and will remove the stored session cookie.
    - To signIn and signOut using buttons, import **signIn** and **signOut** methods from **next-auth/client** and integrate the methods with button click.
    - Use **useSession** hook of next-auth/client which return two params: **[session, loading]** to achieve client side authentication.
