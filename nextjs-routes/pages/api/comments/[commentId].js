import { comments } from "../../../data/comments";

const getComment = (commentId) => {
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  return comment;
};
const handler = (req, res) => {
  const { method, query } = req;
  const { commentId } = query;
  let comment;
  switch (method) {
    case "GET":
      comment = getComment(commentId);
      res.status(200).json(comment);
      break;
    case "DELETE":
      comment = getComment(commentId);
      const commentIndex = comments.findIndex(
        (comment) => comment.id === commentId
      );
      comments.splice(commentIndex, 1);
      res.status(200).json(comment);
      break;
  }
};

export default handler;
