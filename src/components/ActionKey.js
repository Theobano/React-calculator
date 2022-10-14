import React from "react";

function ActionKey({ button, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {button}
    </button>
  );
}

export default ActionKey;
