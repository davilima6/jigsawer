import Answer from '../Answer';
import GameOver from '../GameOver';
import Loading from '../Loading';
import Question from '../Question';
import { digestMessage } from './Challenge.utils';
import { useChallenge } from './useChallenge';
import './Challenge.css';

type Props = {
  disabled: boolean;
  onHit: () => void;
  onMiss: () => void;
  onGameOver: () => void;
  score: number;
};

function Challenge({ disabled, onHit, onMiss, onGameOver, score }: Props) {
  const { loading, error, value: challenge } = useChallenge();

  async function handleAnswer(answer: string): Promise<void> {
    if (challenge === undefined) {
      return;
    }

    challenge.isAnswered = true;

    const hashedAnswer = await digestMessage(answer.toLowerCase());

    if (hashedAnswer === challenge.answerSha1) {
      onHit();
    } else {
      onMiss();
    }
  }

  if (loading) {
    return (
      <main className="challenge-wrapper">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="challenge-wrapper">
        <h1>An error has ocurred:</h1>
        <blockquote>{error}</blockquote>
      </main>
    );
  }

  return (
    <main className="challenge-wrapper">
      {!disabled && challenge ? <Question question={challenge.question} /> : <GameOver score={score} />}
      <Answer onSubmit={handleAnswer} onGameOver={onGameOver} disabled={disabled} />
    </main>
  );
}

export default Challenge;
