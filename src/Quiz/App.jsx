import React, { useState } from "react";
import Content from "./conponents/content";
import Header from "./conponents/header";
import "./index.css";

const App = () => {
  const [s, setS] = useState({});
  const [arr, setArr] = useState([]);
  return (
    <>
      <Header Quiz={arr} score={s} />

      <Content setArr={setArr} setS={setS} />
    </>
  );
};

export default App;
