import React, { useContext } from "react";
import ScreenContext from "../hooks/ScreenContext";

function InputKey({ button }) {
  const { updateScreen } = useContext(ScreenContext);
  function onClick() {
    updateScreen({ type: "INPUT", button: button });
  }
  return (
    <button className="button" onClick={onClick}>
      {button}
    </button>
  );
}

export default InputKey;
