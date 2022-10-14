import React, { useContext, useEffect, useRef } from "react";
import ScreenContext from "../hooks/ScreenContext";

function CalculatorScreen() {
  const { screenState, updateScreen } = useContext(ScreenContext);

  // define ref for calculator screen
  const screenRef = useRef(null);

  // define function to handle keyboard input
  function onKeyDown(event) {
    if (
      [
        "7",
        "8",
        "9",
        "4",
        "5",
        "6",
        "/",
        "1",
        "2",
        "3",
        "*",
        "(",
        "0",
        ")",
        "-",
        ".",
        "+",
      ].includes(event.key)
    ) {
      updateScreen({ type: "INPUT", button: event.key });
      return;
    }
    if (["Backspace", "Delete"].includes(event.key)) {
      updateScreen({ type: "DEL" });
    }
    if (event.key === "=" || event.key === "Enter") {
      updateScreen({ type: "=" });
    }
  }

  useEffect(() => {
    screenRef.current.focus();
  }, [screenState]);

  return (
    <div id="screen" ref={screenRef} tabIndex={0} onKeyDown={onKeyDown}>
      <div id="input-history">{screenState.history}</div>
      <div id="input">{screenState.value}</div>
    </div>
  );
}

export default CalculatorScreen;
