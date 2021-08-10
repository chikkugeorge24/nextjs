import { useRouter } from "next/router";
const Docs = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const length = params.length;
  if (length === 2) {
    return (
      <h1>
        Viewing docs for feature {params[0]} and concept {params[1]}
      </h1>
    );
  } else if (length === 1) {
    return <h1>Viewing docs for feature {params[0]}</h1>;
  }
  return <h1>Docs Page</h1>;
};
export default Docs;
