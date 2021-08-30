import React, { useState, useRef, useEffect } from "react";

const MatrixCell = ({ initialValue, onUpdate, ...props }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth + 2);
  }, [isEditing, value]);

  const changeValue = (event) => {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    setValue(newValue);
  };
  const updateValue = () => {
    setEditing(false);
    if (initialValue !== value) {
      onUpdate(value);
    }
  };
  return (
    <section {...props}>
      <span id="hide" ref={span}>
        {value}
      </span>
      {isEditing ? (
        <input
          type="text"
          autoFocus
          value={value}
          onChange={changeValue}
          onBlur={updateValue}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              updateValue();
            }
          }}
          style={{ width }}
        />
      ) : (
        <div onClick={() => setEditing(true)}>{value}</div>
      )}
    </section>
  );
};

export default MatrixCell;
