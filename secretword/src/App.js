// CSS
import './App.css';

// REACT
import { useCallback, useEffect, useState } from "react";

// data
import {wordsList} from "./data/words";

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordsList);

  // start game
  const startGame = () => {
    setGameStage(stages[1].name);
  };

  // processar o input da letra
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // Restartar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
};

export default App;
