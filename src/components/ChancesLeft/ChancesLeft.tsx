import './ChancesLeft.css';

type Props = {
  amount: number;
};

export const TITLE = 'Chances';

function ChancesLeft({ amount }: Props) {
  return (
    <section className="chances-left-wrapper">
      <h3>{TITLE}</h3>
      <span>{amount}</span>
    </section>
  );
}

export default ChancesLeft;
