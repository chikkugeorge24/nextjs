import React, { useState } from "react";

const Comments = () => {
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");
  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setcomments(data);
  };
  const submitComment = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const deleteComment = async (commentId) => {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    fetchComments();
  };
  return (
    <div>
      <input
        type="text"
        onChange={(event) => setcomment(event.target.value)}
        value={comment}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Fetch Comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
