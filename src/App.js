import "./App.css";
import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import * as uuid from "uuid";
import MatrixCell from "./components/MatrixCell.js";

const generateId = () => uuid.v4();

const initialMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const initialRows = initialMatrix.length;
const initialCols = initialMatrix[0].length;

function App() {
  const [matrix, setMatrix] = React.useState(
    initialMatrix.map((row) =>
      row.map((col) => ({ value: col, key: generateId() }))
    )
  );
  const [cols, setCols] = React.useState(initialCols);
  const [rows, setRows] = React.useState(initialRows);
  const [stagger, setStagger] = React.useState(false);
  const [transition, setTransition] = React.useState(false);

  const makeMatrix = (newRows, newCols, randomData = false) => {
    setTransition(true);
    const newMatrix = new Array(newRows);
    for (let row = 0; row < newMatrix.length; ++row) {
      newMatrix[row] = new Array(newCols);
      for (let col = 0; col < newMatrix[row].length; ++col) {
        if (!randomData && row < matrix.length && col < matrix[row].length) {
          newMatrix[row][col] = matrix[row][col];
        } else {
          newMatrix[row][col] = {
            value: randomData ? Math.floor(Math.random() * 100) : 0,
            key: generateId(),
          };
        }
      }
    }
    setMatrix(newMatrix);
    setRows(newRows);
    setCols(newCols);
  };
  const rotateMatrix = () => {
    setTransition(true);
    // manual way
    const newMatrix = new Array(cols);
    for (let row = 0; row < newMatrix.length; ++row) {
      newMatrix[row] = new Array(rows);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newMatrix[j][rows - i - 1] = matrix[i][j];
      }
    }

    // easy way
    //const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]))
    //let newMatrix = zip([...matrix].reverse());
    const tempCols = cols;
    setCols(rows);
    setRows(tempCols);
    setMatrix(newMatrix);
  };
  const changeCols = (event) => {
    const newCols = event.target.value;
    makeMatrix(rows, parseInt(newCols));
  };
  const changeRows = (event) => {
    const newRows = event.target.value;
    makeMatrix(parseInt(newRows), cols);
  };
  const changeValue = (row, cell, value) => {
    matrix[row][cell].value = value;
    setMatrix(matrix);
  };

  return (
    <div className="App">
      <div id="control">
        <label htmlFor="colSlider">{cols} columns</label>
        <input
          id="colSlider"
          type="range"
          min="1"
          max="10"
          value={cols}
          className="slider"
          onChange={changeCols}
        ></input>
        <label htmlFor="rowSlider">{rows} rows</label>
        <input
          id="rowSlider"
          type="range"
          min="1"
          max="10"
          value={rows}
          className="slider"
          onChange={changeRows}
        ></input>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <button
            style={{ padding: "1vmin", margin: "1vmin" }}
            onClick={rotateMatrix}
          >
            Rotate
          </button>
          <button
            style={{ padding: "1vmin", margin: "1vmin" }}
            onClick={() => makeMatrix(rows, cols, true)}
          >
            Random
          </button>
          <label htmlFor="stagger">Fast</label>
          <input
            type="checkbox"
            id="stagger"
            checked={!stagger}
            onChange={(e) => setStagger(!e.target.checked)}
          ></input>
        </div>
      </div>
      <header className="App-header">
        <Flipper
          flipKey={generateId()}
          onComplete={() => setTransition(false)}
          staggerConfig={{
            default: {
              speed: 0.9,
            },
          }}
        >
          <div
            className={`matrix ${transition ? "transition" : ""}`}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {matrix.map((matrixRow, rowIndex) => {
              return matrixRow.map((matrixCell, cellIndex) => (
                <Flipped
                  stagger={stagger}
                  key={matrixCell.key}
                  flipId={matrixCell.key}
                  translate
                >
                  <div className="gridItem">
                    <MatrixCell
                      onUpdate={(value) =>
                        changeValue(rowIndex, cellIndex, value)
                      }
                      initialValue={matrixCell.value}
                    ></MatrixCell>
                  </div>
                </Flipped>
              ));
            })}
          </div>
          <Flipped key="text" flipId="text">
            <p>Click cell to change value</p>
          </Flipped>
        </Flipper>
      </header>
    </div>
  );
}

export default App;
