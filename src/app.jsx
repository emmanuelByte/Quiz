import React, { useState } from "react";

const App = () => {
  let t = new Date();
  const [time, setTime] = useState("");
  const [ef, seteff] = useState(false);
  setInterval(() => {
    setTime(() => {
      t = new Date();

      return `${t.getSeconds()}:${t.getMinutes()}:${t.getHours()}`;
    });
  }, 1000);
  return (
    <div>
      <p>{ef && time} </p>
      <button onClick={() => seteff((pre) => !pre)}>get time</button>
    </div>
  );
};

export default App;
