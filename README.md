
# Nextjs

React framework for production ready applications.

Provides features like:

    1. File based routing
    2. Pre-rendering
    3. API routes
    4. Support for css modules
    5. Authentication
    6. Dev & Prod build system


## Installation 


```bash 
  npx create-next-app project-name
  cd project-name
  npm run dev or next dev
```


## Routing

- File system based routing mechanism
- The files added under pages folder will become available as a route
- The routes are based on file names
    
    **Nested Routes**

    - Files will come under one root folder
    - The index.js file under the folder will point to the root domain. 

    **Dynamic Routes**

    - Special filename of having [] within that id is specified.

        eg: **[productId].js**  /id, /1, /100, /2 will map to the same route
    - In order to access the route parameter, we need to use **useRouter** of **next/router** package

        **import { useRouter } from 'next/router'**
        
        **const router = useRouter()**
        
        **const productId = router.query.productId** 
        
        productId is same as the Dynamic file name

    - Nested routes will get prioritized before Dynamic routes if both having same name

    **Nested Dynamic Routes**

    - Use dynamic segments (**[].js**) in folder names as well as in file names

    **Catch All Routes**

    - File name should contains **[]** and within that use **spread(...)** operator

        eg: **[...params].js**
    - **router.query** will return an array of query paramters
    - Root domain route always point to 404 page which can be avoided by encapsulating file name within another pare of sqaure brackets.

        eg: **[[...params]].js**
        
        
## Link Component Navigation

- Link is used for client side navigation

    **import Link from 'next/link'**
    
        <Link href='/' replace>
    
            <a>Home</a>

        </Link>

- **replace** prop replace the current history state instead of adding new url to the stack 

## Navigating Programmatically

- Using **push or replace** method of router object

    **import { useRouter } from 'next/router'**
    
    **const router = useRouter()**

    **router.push('/products')**

## 404 Custom Page

- Create a file named **404.js** which contains the stylings of 404 Page


## Pre Rendering

- By default, Next js pre renders every page in the application
- Unlike React, Next js generates HTML for each page in advance instead of having it all done by client side javascript
- In React application, initially HTML is not loaded. Only after JS loaded, React components get initialized and app becomes interactive
- In Next application, on initial load pre rendered HTML got displayed. Then after JS loads it becomes interactive
- **Pre rendering means render in advance of sending it to the browser**
- With a pre rendered page, the HTML is already generated and loads faster
- Pre rendering helps with SEO [Search Engine Optimization].
   
    If a search engine hits a pre rendered page, all the content present in the source code helps to index that page.
- Two types of pre rendering:
    
    **1. Static Generation**

    **2. Server Side Rendering**

## Static Generation

- HTML pages are generated at build time
- Recommended pre render method
- Page can be built once, cached by CDN and served to the client almost instantly
- Eg: e-commerce product pages, blog pages, documentation and marketing pages
- For production builds, a page will be pre rendered once when we run the build command
- In development mode, the page is pre rendered for every request we make


**Static Generation with getStaticProps**

- getStaticProps runs only on server side
- The code written inside getStaticProps won't even be included in the JS bundle that is sent to the browser
- Accessing file system using fs module or querying a database can be done inside getStaticProps
- We can also include API keys inside getStaticProps as it's not make to the browser
- getStaticProps allowed only in a page and can't be run from a regular component file
- It is used only for pre rendering and not for client side data fetching
- getStaticProps returns an object and it contains a props key which is inturn an object
- In production, getStaticProps run on build time. In development mode, it runs on every request


**Pages Vs Components**

- Pages are used to handle automatic routing and access to functions like getStaticProps.
- Presentational Components should place under the folder components.

**Generation of static build on production**

    npm run build

**Running static build file**

    npm run start
        
    
**Static Generation with getStaticPaths**

- Specify dynamic routes to pre-render pages based on data.
- If a page has dynamic routes and uses getStaticProps, it needs to define a list of paths that have to be rendered to HTML at build time.

        export async function getStaticPaths() {
            return {
                paths: [
                    { params: { ... } } 
                ],
                fallback: true or false or blocking
            };
        }

- When **fallback = false**
    - The paths returned from getStaticPaths will be rendered to HTML at build time.
    - Any paths not returned by getStaticPaths will result in a 404 page

- When **fallback = true**

    - The paths returned from getStaticPaths will be rendered to HTML at build time.
    - The paths that have not been generated at build time will not result in 404 page. Instead, nextjs will serve a fallback version of the page on the first request to such a page
    - In background, nextjs will statically generates the requested path HTML and JSON. This includes running getStaticProps.

    - When its done, browser recieves the JSON for the generated path. This will be used to automatically render the page with required props. From user's perspective, page will be swapped from the fallback page to full page

    - Same time nextjs keeps track of the new list of pre rendered pages. Subsequent requests to the same path will serve the generated page just like other pages pre-rendered at build time
    - True value is most suitable if the app has a very large number of static pages that depend on data. 

        eg: e-commerce site


- When **fallback = blocking**
    - The paths returned from getStaticPaths will be rendered to HTML at build time.
    - The paths that have not been generated at build time will not result in a 404 page. Instead, on the first request, nextjs will render the page on server and return the generated HTML

    - When its done, browser recieves the HTML for the generated path. From user's perspective, its a transition from 'browser requesting a page' to the 'full page' is loaded. There is no flash of loading/fallback state

    - Same time nextjs keeps track of the new list of pre rendered pages. Subsequent requests to the same path will serve the generated page just like other pages pre-rendered at build time

- **notFound** - An optional boolean value in getStaticProps to allow the page to return a 404 status and page

            if (!data.id) {
                return {
                    notFound: true,
                };
            }

**Incremental Static Generation**
- With ISR, nextjs allows to update static pages after we have built our application
- We can statically generates individual pages without needing to rebuild the entire site, effectively solving the issue of dealing with stale data
- For that In getStaticProps function, we can specify a **revalidate** key apart from props key
- The value for revalidate is the number of seconds after which a page regeneration can occur.

**Issues with Static Generation**

- Build time is proportional to the number of pages in the application
- A page once generated can contain stale data till the time we rebuild the application
- We can't fetch data at request time. Hence we ran into the problem of stale data

    getStaticProps fetch the data only at build time.

    getStaticPaths fetch the data only on initial request and then its cached for the subsequent requests

    Incremental Static Generation fetch the data on specified intervals using revalidate prop. But still we won't be able to make it up to date when ever regeneration happens in background

- We don't get access to the incoming request. So we won't be able to fetch the data that is specific to a user

  
## Serve Side Rendering (SSR)

- Nextjs pre-renders a page not at build time but at request time
- The HTML is generated for every incoming request

**SSR with getServerSideProps**

- If you export an async function called getServerSideProps from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.

- getServerSideProps runs only on server side, will never run on client side

- The code written inside getServerSideProps won't even be included in the JS bundle sent to the browser

- Accessing a file system using fs module, use of API keys, and querying a database can be directly included inside the getServerSideProps

- getServerSideProps allowed only in a page and can't be run from a regular component file

        export async function getServerSideProps(context) {
            return {
                props: {},
            }
        }
- getServerSideProps should return an object with:

    - props
        
        An optional object with the props that will be received by the page component.

    - notFound
    
        An optional boolean value to allow the page to return a 404 status and page      

**SSR with Dynamic parameters**

- params can be extracted from the context object
- We can access the incoming request through context.
- Context param contains: **params, req, res, query** etc.


## Client Side Data Fetching

- If the page contains frequently updating data, and we don’t need to pre-render the data, we can fetch the data on the client side. 
- First, immediately show the page without data. Parts of the page can be pre-rendered using Static Generation. We can show loading states for missing data.
- Then, fetch the data on the client side and display it when ready.
- eg: user-specific data like user dashboard pages.

    Because a dashboard is a private, user-specific page, SEO is not relevant and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

## SWR for Client Side Data Fetching
- **stale-while-revalidate**
- React hook for client side data fetching
- It handles caching, revalidation, focus tracking, refetching on interval, and more.
- **npm i swr --save**

        import useSWR from 'swr'

        const fetcher = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            return data
        }

        function Profile() {
            const { data, error } = useSWR('/api/user', fetcher)
            if (error) return <div>failed to load</div>
            if (!data) return <div>loading...</div>
            return <div>hello {data.name}!</div>
        }

## API routes

- API routes allows to create RESTful endpoints as part of Nextjs application folder structure
- Within the pages folder, create another folder called 'api'. Within api folder, need to define all apis 
- Create a handler function to handle the API request and responses
        
        const handler = (req, res) => {
            res.status(200).json({ name: "Home API route" });
        };

        export default handler;

  
## Styling

**Global Styles**
- global.css contains the styles
- External css files are imported inside **pages/_app.js**

**Component Level Styles / CSS modules**
- CSS modules are locally scoped and the styles of same class overwrites that of global styles
- Same style classes can be used across different files
- **filename.module.css**

**SASS Support**
- **npm install sass**
- Create _filename.scss file and declare the variables as :
  
        $purple: purple;
        $red: red;
- Create filename.module.scss, and import the SASS file as:
    - **@import 'SASS filename'**

## Layout
- Deconstruct a page into a series of components.
- **Single Shared Layout with Custom App**
    
    - One layout for the entire application, we can create a Custom App(_app.js) and wrap the application with the layout.
       
           return (
                <>
                  <Header />
                  <Component {...pageProps} />
                  <Footer />
                </>
           );
- **Per-Page Layouts**

    - If we need multiple layouts, we can add a property **getLayout** to the page, allowing to return a React component for the layout.
        
            About.js

            ------------
        
            About.getLayout = function PageLayout(page) {
              return (
                <>
                  {page}
                  <Footer />
                </>
              );
            };
        
       
           _app.js

            ------------
        
            if (Component.getLayout) {
                return Component.getLayout(<Component {...pageProps} />);
            }
  
- **Head Component**

    - **import Head from "next/head"**
             
             <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            
- **Image Component and its optimization**
    - Next.js has a built-in Image Component and Automatic Image Optimization.
    - The Next.js Image Component, **next/image**, is an extension of the HTML **img** element.
    - The Automatic Image Optimization allows for resizing, optimizing, and serving images in modern formats like **WebP**
    - Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them.Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
    - **import Image from 'next/image'**
    - Optional properties to Image component:

        - A **placeholder** to use while the image is loading, possible values are blur or empty. Defaults to empty.
        - When blur, the **blurDataURL** property will be used as the placeholder. If src is an object from a static import and the imported image is jpg, png, or webp, then blurDataURL will automatically be populated.For dynamic images, we must provide the blurDataURL property.
        - When empty, there will be no placeholder while the image is loading, only empty space.


## Absolute Imports & Module Paths

- Create jsconfig.json file
       
       {
          "compilerOptions": {
            "baseUrl": ".",
            "paths": {
              "@/layout/*": ["components/layout/*"]
             }
          }
       } 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
