import React from "react";
import load from "../load1.gif";

const Loader = () => {
  return (
    <center>
      <img src={load} alt="loading" width="320px" height="200px" />
    </center>
  );
};

export default Loader;
