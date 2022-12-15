import './ChancesLeft.css';

type Props = {
  amount: number;
};

function ChancesLeft({ amount }: Props) {
  return <section className="chances-left-wrapper">{amount}</section>;
}

export default ChancesLeft;
