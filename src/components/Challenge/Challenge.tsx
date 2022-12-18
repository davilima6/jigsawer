import Answer from '../Answer';
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
};

function Challenge({ disabled, onHit, onMiss, onGameOver }: Props) {
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
        <h2>An error has ocurred:</h2>
        <blockquote>{error}</blockquote>
      </main>
    );
  }

  return (
    <main className="challenge-wrapper">
      {challenge ? (
        <>
          <Question question={challenge.question} />
          <Answer onSubmit={handleAnswer} onGameOver={onGameOver} disabled={disabled} />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Challenge;
