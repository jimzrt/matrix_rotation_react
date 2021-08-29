import "./App.css";
import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import * as uuid from "uuid";
import MatrixCell from "./components/MatrixCell.js";

//const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]))
const generateId = () => uuid.v4();

const initialMatrix = [
  [
    { value: 1, key: generateId() },
    { value: 2, key: generateId() },
    { value: 3, key: generateId() },
  ],
  [
    { value: 4, key: generateId() },
    { value: 5, key: generateId() },
    { value: 6, key: generateId() },
  ],
  [
    { value: 7, key: generateId() },
    { value: 8, key: generateId() },
    { value: 9, key: generateId() },
  ],
];
const initialRows = initialMatrix.length;
const initialCols = initialMatrix[0].length;

function App() {
  const [matrix, setMatrix] = React.useState(initialMatrix);
  const [cols, setCols] = React.useState(initialCols);
  const [rows, setRows] = React.useState(initialRows);
  const makeMatrix = (newRows, newCols) => {
    const newMatrix = new Array(newRows);
    for (let row = 0; row < newMatrix.length; ++row) {
      newMatrix[row] = new Array(newCols);
      for (let col = 0; col < newMatrix[row].length; ++col) {
        if (row < matrix.length && col < matrix[row].length) {
          newMatrix[row][col] = matrix[row][col];
        } else {
          newMatrix[row][col] = { value: 0, key: generateId() };
        }
      }
    }

    setMatrix(newMatrix);
    setRows(newRows);
    setCols(newCols);
  };
  const rotateMatrix = () => {
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
    const newMatrix = [...matrix];
    newMatrix[row][cell] = { value: value, key: generateId() };
    setMatrix(newMatrix);
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
        <button
          style={{ padding: "1vmin", margin: "1vmin" }}
          onClick={rotateMatrix}
        >
          Rotate
        </button>
      </div>
      <header className="App-header">
        <Flipper
          flipKey={generateId()}
          staggerConfig={{
            default: {
              speed: 0.9,
            },
          }}
        >
          <div
            className="matrix"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {matrix.map((matrixRow, rowIndex) => {
              return matrixRow.map((matrixCell, cellIndex) => (
                <Flipped stagger key={matrixCell.key} flipId={matrixCell.key}>
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
        </Flipper>
        <p>Click cell to change value</p>
      </header>
    </div>
  );
}

export default App;
