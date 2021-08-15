import React from "react";
import Head from "next/head";

const Blog = ({ title, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <h1 className="content">Blog</h1>
    </div>
  );
};

export default Blog;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          blogId: "1",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      title: "Article Title",
      description: "Article Description",
    },
  };
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       title: "Article Title",
//       description: "Article Description",
//     },
//   };
// }
