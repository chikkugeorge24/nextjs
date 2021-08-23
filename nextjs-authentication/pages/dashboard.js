import { useState, useEffect } from "react";
import { getSession, signIn } from "next-auth/client";

const dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return <h1>Dashboard Page</h1>;
};

export default dashboard;
