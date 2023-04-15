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

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // pegando uma categoria aleatoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pegando uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category}
  }, [words]);

  // start game
  const startGame = useCallback(() => {
    // limpando todas as letras
    clearLetterStates();

    // pick word e pick category
    const {word, category} = pickWordAndCategory();

    // criando um array de letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // setando estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // processar o input da letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // checando se a letra ja foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // enviar uma guessed letter ou remover uma guess
    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

// condicao de derrota
  useEffect(() => {
    if(guesses <= 0) {
      // resetar todos os estados
      clearLetterStates()
      
      setGameStage(stages[2].name);
    }
  }, [guesses]);

// checando condicao de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //condicao de vitoria
    if(guessedLetters.length === uniqueLetters.length) {
      // adicionar pontuacao
      setScore((actualScore) => actualScore += 100)

      // recomecar o jogo com palavra nova
      startGame();
    }
  }, [guessedLetters, letters, startGame])

  // Restartar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (<Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters} 
        wrongLetters={wrongLetters} 
        guesses={guesses} 
        score={score} 
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
};

export default App;
