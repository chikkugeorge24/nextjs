import { comments } from "../../../data/comments";
const handler = (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      res.status(200).json(comments);
      break;
    case "POST":
      const { comment } = body;
      const newComment = {
        id: Date.now(),
        text: comment,
      };
      comments.push(newComment);
      res.status(200).json(newComment);
  }
};

export default handler;
