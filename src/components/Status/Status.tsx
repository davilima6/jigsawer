import ChancesLeft from '../ChancesLeft';
import Score from '../Score';
import './Status.css';

type Props = {
  chancesLeft: number;
  score: number;
};

function Status({ chancesLeft, score }: Props) {
  return (
    <aside className="status-wrapper">
      <Score amount={score} />
      <hr />
      <ChancesLeft amount={chancesLeft} />
    </aside>
  );
}

export default Status;
