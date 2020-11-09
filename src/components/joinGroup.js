import React, { useState } from "react";
import "../styles/styles.css";
import TextField from "@material-ui/core/TextField";
import { gql, useMutation } from "@apollo/client";

const ADD = gql`
  mutation onAdd($username: String!) {
    joingroup(data: { username: $username }) {
      username
    }
  }
`;

export default function Home({ history }) {
  const [onAdd, { data, error }] = useMutation(ADD);

  const [user, SetUser] = useState("");

  const HandleChange = (e) => {
    SetUser(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    onAdd({ variables: { username: user } });
    localStorage.setItem("user", JSON.stringify(user));
    SetUser("");
    history.push("/letschat");
  };

  return (
    <div id="container">
      <form
        className="join-form"
        noValidate
        // autoComplete="off"
        onSubmit={HandleSubmit}
      >
        <h2 className="h2-join">Welcome Back</h2>
        <TextField
          id="outlined-basic"
          label="USERNAME"
          variant="outlined"
          onChange={HandleChange}
          value={user}
        />
        <button className="btn-joingroup">joinGroup</button>
      </form>
    </div>
  );
}
