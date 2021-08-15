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

export async function getServerSideProps() {
  return {
    props: {
      title: "Article Title",
      description: "Article Description",
    },
  };
}
