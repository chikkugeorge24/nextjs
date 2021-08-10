import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
};
const DashboardSWR = () => {
  const { data, error } = useSWR("dashboard", fetcher);
  if (error) return "An Error has occurred!";
  if (!data) return "Loading...";
  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Name - {data[0].name}</h2>
      <h2>Email - {data[0].email}</h2>
      <h2>Website - {data[0].website}</h2>
    </div>
  );
};

export default DashboardSWR;
