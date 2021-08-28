import React, { useState } from "react";

const MatrixCell = ({
    initialValue,
    onUpdate,
    ...props
}) => {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue)

    const makeEditable = () => {
        setEditing(true)
    };
    const changeValue = (event) => {
        let newValue = parseInt(event.target.value)
        if (isNaN(newValue)) {
            newValue = 0;
        }
        setValue(newValue)
    };
    const updateValue = () => {
        setEditing(false);
        if (initialValue !== value) {
            onUpdate(value)
        }
    }
    return (<section {...props} > {
        isEditing ? (< input type="text"
            autoFocus value={value}
            onChange={changeValue}
            onBlur={updateValue}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    updateValue()
                }
            }}
            style={{ 'width': `calc(2vmin*${value.toString().length})` }}
        />) : (<div onClick={makeEditable}>{value}</div >)
    } </section>)
}

export default MatrixCell;