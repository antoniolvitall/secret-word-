import './GameOver.css';

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Fim do jogo! </h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <p>Vamos jogar novamente?</p>
      <button onClick={retry}>Jogar</button>
    </div>
  )
}

export default GameOver