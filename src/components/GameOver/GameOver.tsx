type Props = {
  score: number;
};

function GameOver({ score }: Props) {
  const compliment = score > 0 ? 'Congratulations' : 'Pity';
  const needsPlural = score === 0 || score > 1;

  return (
    <section>
      <h1>Game over.</h1>
      <p>
        {compliment}, you made {score} point{needsPlural ? 's' : ''}!
      </p>
    </section>
  );
}

export default GameOver;
