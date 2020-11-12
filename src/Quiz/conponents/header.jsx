import React from "react";

const Header = ({ Quiz, score }) => {
  return (
    <div className="Score">
      Score
      {Object.keys(score).length}/{Quiz.length}
    </div>
  );
};

export default Header;
