import './GameOver.css';

type Props = {
  onGameOver: () => void;
  score: number;
};

function GameOver({ onGameOver, score }: Props) {
  const compliment = score > 0 ? 'Congratulations' : 'Pity';
  const needsPlural = score === 0 || score > 1;

  return (
    <section className="game-over-wrapper">
      <h1>Game over.</h1>
      <p>
        {compliment}, you made {score} point{needsPlural ? 's' : ''}!
      </p>
      <button className="reset" onClick={onGameOver} autoFocus>
        Try again
      </button>
    </section>
  );
}

export default GameOver;
