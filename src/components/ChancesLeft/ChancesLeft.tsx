import './ChancesLeft.css';

type Props = {
  amount: number;
};

function ChancesLeft({ amount }: Props) {
  return (
    <section className="chances-left-wrapper">
      <h3>Chances</h3>
      <span>{amount}</span>
    </section>
  );
}

export default ChancesLeft;
