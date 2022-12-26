import './GameOver.css';

type Props = {
  onTryAgain: () => void;
  score: number;
};

export const TITLE = 'Game over.';
export const BUTTON_LABEL = 'Try again';

function GameOver({ onTryAgain, score }: Props) {
  const compliment = score > 0 ? 'Congratulations' : 'Pity';
  const needsPlural = score === 0 || score > 1;

  return (
    <section className="game-over-wrapper">
      <h1>{TITLE}</h1>
      <p>
        {compliment}, you made {score} point{needsPlural ? 's' : ''}!
      </p>
      <button className="reset" onClick={onTryAgain} autoFocus>
        {BUTTON_LABEL}
      </button>
    </section>
  );
}

export default GameOver;
