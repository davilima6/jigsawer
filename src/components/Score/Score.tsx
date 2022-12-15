import './Score.css';

type Props = {
  amount: number;
};

function Score({ amount }: Props) {
  return (
    <section className="score-wrapper">
      <h3>Score</h3>
      <span>{amount}</span>
    </section>
  );
}

export default Score;
