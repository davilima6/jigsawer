import { useState } from 'react';

import Answer from '../Answer';
import Loading from '../Loading';
import Question from '../Question';
import { digestMessage } from './Challenge.utils';
import { useChallenges } from './useChallenges';
import './Challenge.css';

type Props = {
  disabled: boolean;
  onHit: () => void;
  onMiss: () => void;
  onGameOver: () => void;
};

function Challenge({ disabled, onHit, onMiss, onGameOver }: Props) {
  const [key, setKey] = useState(0);
  const { loading, error, value: challenges } = useChallenges();
  const challenge = challenges?.[0];

  async function handleAnswer(answer: string): Promise<void> {
    const hashedAnswer = await digestMessage(answer.toLowerCase());

    if (hashedAnswer === challenge?.answerSha1) {
      onHit();
    } else {
      onMiss();
    }
  }

  function handleGameOver(): void {
    setKey((keyCur) => keyCur + 1);
    onGameOver();
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
    <main key={key} className="challenge-wrapper">
      {challenge ? (
        <>
          <Question question={challenge.question} />
          <Answer onSubmit={handleAnswer} onGameOver={handleGameOver} disabled={disabled} />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Challenge;
