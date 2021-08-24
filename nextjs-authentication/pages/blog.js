import { getSession } from "next-auth/client";

const blog = ({ data }) => {
  return <h1>{data}</h1>;
};

export default blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${process.env.CALLBACK_URL}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      data: session ? "List of 100 personalized blogs" : "List of free blogs",
    },
  };
}
