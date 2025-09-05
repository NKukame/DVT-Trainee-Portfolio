import React from "react";
import { useLogout, useNavigation } from "@refinedev/core";

import { Link } from "react-router";

export default function Header() {
  const { mutate } = useLogout();


  // You can also use methods like list or create to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
      </h2>
      <Link to={listUrl("employee")}>List Employees</Link>{" "}
      <Link to={createUrl("employee")}>Create Employee</Link>{" "}
      <button type="button" onClick={mutate}>
        Logout
      </button>
    </>
  );
};