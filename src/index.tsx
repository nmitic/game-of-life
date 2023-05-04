import * as React from "react";
import { render } from "react-dom";
import GameOfLife from "./game";

render(<GameOfLife size={25} />, document.getElementById("root"));
