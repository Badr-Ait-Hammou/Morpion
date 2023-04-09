import React from "react";
import Square from "../components/Square";

export default function Board(props) {
    function square(x) {
        return <Square value={props.values[x]} onClick={() => props.onClick(x)} />;
    }
    const backMain = () => {
        window.location.reload();
    };
    return (
        <div>
            <button className="btnBack" onClick={backMain}>
                Back
            </button>
            <div className="board-row">
                {square(0)}
                {square(1)}
                {square(2)}
            </div>
            <div className="board-row">
                {square(3)}
                {square(4)}
                {square(5)}
            </div>
            <div className="board-row">
                {square(6)}
                {square(7)}
                {square(8)}
            </div>
        </div>
    );
}
