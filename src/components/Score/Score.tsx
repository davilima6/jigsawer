import './Score.css';

type Props = {
  amount: number;
};

export const TITLE = 'Score';

function Score({ amount }: Props) {
  return (
    <section className="score-wrapper">
      <h3>{TITLE}</h3>
      <span>{amount}</span>
    </section>
  );
}

export default Score;
