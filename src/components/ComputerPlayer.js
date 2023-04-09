import { useEffect, useState } from "react";

import Board from "../components/Board";

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

export default function ComputerPlayer() {




    const [values, setValues] = useState(Array(9).fill(null));
    const [win, setwin] = useState(null);



    useEffect(() => {
        const compTurn = values.filter((val) => val !== null).length % 2 === 1;
        const matriceThatAre = (a, b, c) => {
            return matrice.filter((valIndexes) => {
                const valValues = valIndexes.map((index) => values[index]);
                return (
                    JSON.stringify([a, b, c].sort()) === JSON.stringify(valValues.sort())
                );
            });
        };
        const emptyIndexes = values
            .map((val, index) => (val === null ? index : null))
            .filter((val) => val !== null);
        const playerWon = matriceThatAre("x", "x", "x").length > 0;
        const computerWon = matriceThatAre("o", "o", "o").length > 0;
        if (playerWon) {
            setwin("x");
        } else if (computerWon) {
            setwin("o");
        } else {
            setwin(null);
        }

        const putComputerAt = (index) => {
            let newvalues = values;
            newvalues[index] = "o";
            setValues([...newvalues]);
        };
        if (compTurn) {
            const winingmatrice = matriceThatAre("o", "o", null);
            if (winingmatrice.length > 0) {
                const winIndex = winingmatrice[0].filter(
                    (index) => values[index] === null
                )[0];
                putComputerAt(winIndex);
                return;
            }

            const matriceToBlock = matriceThatAre("x", "x", null);
            if (matriceToBlock.length > 0) {
                const blockIndex = matriceToBlock[0].filter(
                    (index) => values[index] === null
                )[0];
                putComputerAt(blockIndex);
                return;
            }

            const matriceToContinue = matriceThatAre("o", null, null);
            if (matriceToContinue.length > 0) {
                putComputerAt(
                    matriceToContinue[0].filter((index) => values[index] === null)[0]
                );
                return;
            }

            const randomIndex =
                emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
            putComputerAt(randomIndex);
        }
    }, [values]);

    function handleComputerMove(index) {
        const isPlayerTurn = values.filter((val) => val !== null).length % 2 === 0;
        if (isPlayerTurn) {
            if(values[index] === "o"){
                return ;
            }else{
                let newvalues = values;
                newvalues[index] = "x";
                setValues([...newvalues]);
            }
        }
    }
    const newGame = () => {
        setValues(Array(9).fill(null));
        setwin(null);
    };

    return (
        <div>
            <Board values={values} onClick={handleComputerMove} />
            {win ? (
                <>
                    <h3 style={ {color: "#10B981" }}>Congrats {win} you are the winner </h3>
                    <button className="btnN" onClick={newGame}>
                        Nouvelle partie{" "}
                    </button>
                </>
            ) : values.filter((val) => val === null).length === 0 && win === null ? (
                <>
                    <h1 style={{color: "#DC2626"}} >No winner</h1>
                    <button className="btnN" onClick={newGame}>
                        Nouvelle partie
                    </button>
                </>
            ) : null}
        </div>
    );
}
