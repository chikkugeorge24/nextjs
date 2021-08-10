import React from "react";
import Link from "next/link";

const PostsList = ({ posts }) => {
  return (
    <>
      <h1>List of posts</h1>
      {posts.map((post) => {
        const { id, title } = post;
        return (
          <div key={id}>
            <Link href={`posts/${id}`} passHref>
              <h2>
                {id} {title}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
};
export default PostsList;

export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return {
    props: {
      posts: data,
    },
  };
};
