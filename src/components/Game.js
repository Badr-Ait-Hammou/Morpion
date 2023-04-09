import React, { useState } from "react";
import Board from "./Board";

import ComputerPlayer from "../components/ComputerPlayer";

export default function Game(props) {
    const [turn, setTurn] = useState("x");
    const [values, setValues] = useState(Array(9).fill(""));
    const [win, setWin] = useState();
    const [gameMode, setGameMode] = useState(null);
    const matrice = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const checkwinner = (squ) => {
        for (let i in matrice) {
            const [a, b, c] = matrice[i];
            if (squ[a] && squ[a] === squ[b] && squ[a] === squ[c]) {
                setWin(squ[a]);
                return squ[a];
            }
        }
        return null;
    };

    function onClick(x) {
        // alert('click '+ x)
        if (values[x] !== "") {
            return;
        }
        let squ = [...values];
        if (turn === "x") {
            squ[x] = "x";
            setTurn("o");
        } else {
            squ[x] = "o";
            setTurn("x");
        }
        // console.log(squ)
        checkwinner(squ);
        setValues(squ);
    }

    const newGame = () => {
        setValues(Array(9).fill(""));
        setWin(null);
    };
    return (
        <div>
            <div className="game-info">
                {gameMode ? (
                    gameMode === "play-vs-computer" ? (
                        <div>
                            <h3 style={{color:"white"}}>Player (x) vs computer (o) </h3>
                            <ComputerPlayer />
                        </div>
                    ) : (
                        <div>
                            <h3>Player ({turn})</h3>
                            <Board values={values} onClick={onClick} />
                            {win ? (
                                <>
                                    <h3 style={{color: "#10B981"}} > Congrats {win} you are the winner </h3>
                                    <button className="btnN" onClick={newGame}>
                                        Nouvelle partie{" "}
                                    </button>
                                </>
                            ) : !values.includes("") ? (
                                <>
                                    <h3 style={{color: "#DC2626"}} >No winner</h3>
                                    <button className="btnN" onClick={newGame}>
                                        {" "}
                                        Nouvelle partie{" "}
                                    </button>
                                </>
                            ) : null}
                        </div>
                    )
                ) : (

                    <div className="container">
                        <div className="text-column">
                            <h1>WELCOME TO TIC TAC TOE GAME</h1>
                            <h5 style={{color:"white"}}>designed by AIT HAMMOU</h5>
                        </div>
                        <div className="buttons-column">
                            <button
                                className="btn"
                                onClick={() => setGameMode("play-vs-computer")}
                            >
                                Play vs Computer
                            </button>
                            <br />
                            <button
                                className="btn"
                                onClick={() => setGameMode("play-vs-friend")}
                            >
                                Play vs Friend
                            </button>
                        </div>

                    </div>



                )}
            </div>
        </div>
    );
}
