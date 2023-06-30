import * as React from "react";
import { render } from "react-dom";
import GameOfLife from "./game";
import { generateEmptyArray } from "./game-of-life";

render(
  <GameOfLife size={50} initialUniverse={generateEmptyArray(50, 50)} />,
  document.getElementById("root")
);
