import React from "react";
import { LoV, useLovListMemo } from "taipy-gui";

interface ToDoListProps {
    lov?: LoV;
    defaultLov?: string;
}

const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
}

const divStyle = {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
}

const ListOfLanguages = (props: ToDoListProps) => {
    const { lov, defaultLov = "" } = props;
    const lovList = useLovListMemo(lov, defaultLov);

    return (
        <div style={divStyle}>
            <select style={selectStyle}>
                {lovList.map((todo, index) => (
                    <option key={index} value={typeof todo.item === "string" ? todo.item : ""}>
                        {typeof todo.item === "string" ? todo.item : null}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ListOfLanguages;
