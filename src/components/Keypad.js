import React, { useContext } from "react";
import ScreenContext from "../hooks/ScreenContext";
import ActionKey from "./ActionKey";
import InputKey from "./InputKey";

function Keypad() {
  const { updateScreen } = useContext(ScreenContext);

  const keyLabels = [
    "7",
    "8",
    "9",
    "DEL",
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
    "CE",
    ".",
    "=",
    "+",
  ];
  const actionKeyLabels = ["DEL", "CE", "="];
  const actionHandler = {
    DEL: () => {
      updateScreen({ type: "DEL" });
    },
    CE: () => {
      updateScreen({ type: "CE" });
    },
    "=": () => {
      updateScreen({ type: "=" });
    },
  };

  const keys = keyLabels.map((keyLabel) => {
    if (actionKeyLabels.includes(keyLabel)) {
      return (
        <ActionKey
          key={keyLabel}
          onClick={actionHandler[keyLabel]}
          button={keyLabel}
        />
      );
    } else {
      return <InputKey key={keyLabel} button={keyLabel} />;
    }
  });
  return <div id="keypad">{keys}</div>;
}

export default Keypad;
