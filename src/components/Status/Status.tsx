import ChancesLeft from '../ChancesLeft';
import Score from '../Score';
import './Status.css';

type Props = {
  chancesLeft: number;
  points: number;
};

function Status({ chancesLeft, points }: Props) {
  return (
    <aside className="status-wrapper">
      <Score amount={points} />
      <hr />
      <ChancesLeft amount={chancesLeft} />
    </aside>
  );
}

export default Status;
