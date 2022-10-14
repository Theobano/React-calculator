import { evaluate } from "mathjs";
import { useEffect, useReducer, useState } from "react";
import "./App.css";
import CalculatorScreen from "./components/CalculatorScreen";
import Keypad from "./components/Keypad";
import MathError from "./errors/MathError";
import ScreenContext from "./hooks/ScreenContext";

// define main App component
function App() {
  // define a theme mode state
  const [themeMode, setThemeMode] = useState("light");

  function setTheme(theme) {
    setThemeMode(theme);

    if (themeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setTheme(event.matches ? "dark" : "light");
      });

    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  });
  // define an initial state of the screen
  const initScreenState = {
    value: "",
    isAnswer: false,
    isError: false,
    history: "",
  };
  // console.log(document.body.classList);

  // define reducer function to handle button logic
  const screenUpdateReducer = (state, action) => {
    // define button action handling
    switch (action.type) {
      case "CE":
        return {
          ...initScreenState,
          history: state.isAnswer
            ? state.isError
              ? state.value
              : "Ans = " + state.value
            : state.history,
        };
      case "DEL":
        return {
          ...initScreenState,
          value: state.isAnswer ? "" : state.value.slice(0, -1),
          history: state.isAnswer
            ? state.isError
              ? state.value
              : "Ans = " + state.value
            : state.history,
        };

      case "=":
        if (state.isAnswer) {
          return { ...state };
        }
        if (state.value !== "") {
          // handle error during evaluation
          try {
            const answer = evaluate(state.value);
            if (!isNaN(answer)) {
              return {
                ...initScreenState,
                value: answer,
                isAnswer: true,
                history: state.value + " =",
              };
            } else {
              throw MathError;
            }
          } catch (error) {
            return {
              ...initScreenState,
              value: error.name,
              isAnswer: true,
              isError: true,
              history: state.value,
            };
          }
        }
        return { ...state };

      case "INPUT":
        if (!isNaN(action.button) || ".()".includes(action.button)) {
          if (state.isAnswer) {
            return {
              ...initScreenState,
              value: action.button,
              isAnswer: false,
              isError: false,
              history: state.isError ? state.value : "Ans = " + state.value,
            };
          }
          return { ...state, value: state.value + action.button };
        } else {
          if (state.isError) {
            return {
              ...initScreenState,
              value: action.button,
              isAnswer: false,
              isError: false,
              history: state.value,
            };
          }
          return {
            ...state,
            value: state.value + action.button,
            isAnswer: false,
            isError: false,
          };
        }

      case "KEYBOARD-INPUT":
        return {
          ...initScreenState,
          value: action.value,
          isAnswer: false,
          isError: false,
        };

      default:
        return state;
    }
  };

  // create reducer using useReducer
  const [screenState, updateScreen] = useReducer(
    screenUpdateReducer,
    initScreenState
  );

  // const [screenState, updateScreen] = useState("");

  return (
    <ScreenContext.Provider value={{ screenState, updateScreen }}>
      <div className="App">
        <div className="center">
          <div id="calculator">
            <CalculatorScreen />
            <Keypad />
          </div>
        </div>
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
