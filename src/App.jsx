import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { Winning_Combinations } from "./Winning_Combinations";
import GameOver from "./components/GameOver";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") currentPlayer = "0";

  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState({
    X: "Player 1",
    0: "Player 2",
  });
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    //this turns prop is a prop that is derived from the state
    let { square, player } = turn;
    let { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of Winning_Combinations) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = player[firstSquare];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  const ChangePlayer = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      console.log(updatedTurns);
      return updatedTurns;
    });
  };
  const ReMatch = () => {
    setGameTurn([]);
  };
  const onChange = (symbol, newName) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onchange={onChange}
          />
          <Player
            name="Player 2"
            symbol="0"
            isActive={activePlayer === "0"}
            onchange={onChange}
          />
        </ol>
        {winner || hasDraw ? (
          <GameOver winner={winner} rematch={ReMatch} />
        ) : (
          ""
        )}
        <GameBoard setPlayer={ChangePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
