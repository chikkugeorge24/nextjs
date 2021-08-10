import React from "react";
import { comments } from "../../data/comments";

const Comment = ({ comment }) => {
  return (
    <div>
      {comment.id} {comment.text}
    </div>
  );
};

export default Comment;

export const getStaticPaths = async () => {
  const paths = [
    {
      params: {
        commentId: "1",
      },
    },
    {
      params: {
        commentId: "2",
      },
    },
    {
      params: {
        commentId: "3",
      },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { commentId } = params;
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  return {
    props: {
      comment,
    },
  };
};
