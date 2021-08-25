# Authentication

- 3 Types of Authentications:

  - Client side authentication
  - Server side authentication
  - API routes authentication

- **Client side authentication**
  
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
    - Use **getSession** hook of next-auth/client to secure pages in client side. This hook will return a session or a null.
    - To make the session available across all the pages/components, use **NextAuth Provider** and wrap the component inside Provider tags
      
      import { Provider } from 'next-auth/client'
      
      
- **Server side authentication**

  - If we export an async function called `getServerSideProps` from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.
  - Use `getSession` hook along with `context` param to get the session object. 
  - Pass the session to `Provider` in _app.js to avoid the flicker effect
  - If session is null, return a redirect object with a specified destination to secure server side pages.
  - Use getSession inside `handler` function to secure API routes.

- **Connecting to Database**

  - Create a database in mongodb atlas
  - **npm i mongodb**
  - Paste Username, password and database url in .env file and make use of it.
  - Add database, jwt and secret in NextAuth file
  
        export default NextAuth({
          providers: [
            Providers.GitHub({
              clientId: process.env.GITHUB_ID,
              clientSecret: process.env.GITHUB_SECRET,
            }),
          ],
          database: process.env.DB_URL,
          session: {
            jwt: true,
          },
          jwt: {
            secret: "yhhkkkkooo",
          },
        });
