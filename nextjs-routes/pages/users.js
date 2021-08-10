import React from "react";
import User from "../components/user";

const UsersList = ({ users }) => {
  return (
    <>
      <h1>List of users</h1>
      {users.map((user) => {
        const { id } = user;
        return (
          <div key={id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};
export default UsersList;

export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return {
    props: {
      users: data,
    },
  };
};
