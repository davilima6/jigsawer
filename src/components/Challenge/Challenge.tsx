import Answer from '../Answer';
import Loading from '../Loading';
import Question from '../Question';
import { digestMessage } from './Challenge.utils';
import { useChallenges } from './useChallenges';
import './Challenge.css';

type Props = {
  onHit: () => void;
  onMiss: () => void;
};

function Challenge({ onHit, onMiss }: Props) {
  const { loading, error, value: challenges } = useChallenges();
  const challenge = challenges?.[0];

  async function handleAnswer(answer: string) {
    const hashedAnswer = await digestMessage(answer.toLowerCase());

    if (hashedAnswer === challenge?.answerSha1) {
      onHit();
    } else {
      onMiss();
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main>
        <h2>An error has ocurred:</h2>
        <blockquote>{error}</blockquote>
      </main>
    );
  }

  return (
    <main>
      {challenge ? (
        <>
          <Question question={challenge.question} />
          <Answer onAnswer={handleAnswer} />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Challenge;
