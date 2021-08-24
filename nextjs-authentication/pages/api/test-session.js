import { getSession } from "next-auth/client";
const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ err: "Unauthenticated User !" });
  } else {
    res.status(200).json({ message: "Success", session });
  }
};

export default handler;
