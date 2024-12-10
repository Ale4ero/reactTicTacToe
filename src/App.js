import { useState } from "react";
import Square from "./components/Square";



function Board({firstPlayer, squares, onPlay}) {

  const winner = calculateWinner(squares)

  let status = winner ? "Winner: " + winner : "Next Player: "+ (firstPlayer ? "X": "O") 



  function handleClick(i){
    //only add a 'x' or 'o' to an empty square
    if (squares[i] || calculateWinner(squares)) return

    //make a copy of current array of squares and assign it to nextSquares
    const nextSquares = squares.slice()

    //determine input based on firstPlayer state
    const input = firstPlayer ? "X" : "O"
    nextSquares[i] = input

    onPlay(nextSquares)

  }

  return (
    <>
      <div className="statues">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>

  );
}

export default function Game(){

  const [firstPlayer, setFirstPlayer] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares){
    setHistory([...history, nextSquares]);
    firstPlayer ? setFirstPlayer(false) : setFirstPlayer(true)

  }

  return (
    <div className="game">
      <div className="game-board">
        <Board firstPlayer={firstPlayer} squares={currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )

}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


