import { useState } from 'react';

import Challenge from '../../components/Challenge';
import Status from '../../components/Status';
import ThemeToggler from '../../components/ThemeToggler';
import './App.css';

const INITIAL_SCORE = 0;
const INITIAL_CHANCES_LEFT = 3;

function App() {
  const [score, setScore] = useState(INITIAL_SCORE);
  const [chancesLeft, setChancesLeft] = useState(INITIAL_CHANCES_LEFT);

  function handleHit(): void {
    setScore((prev) => prev + 1);
  }

  function handleMiss(): void {
    if (chancesLeft === 0) {
      return;
    }

    setChancesLeft((prev) => prev - 1);
  }

  function handleTryAgain(): void {
    setScore(INITIAL_SCORE);
    setChancesLeft(INITIAL_CHANCES_LEFT);
  }

  function handleThemeToggle(): void {
    const { theme } = document.body.dataset;
    document.body.dataset.theme = theme === 'light' ? 'dark' : 'light';
  }

  const isGameOver = chancesLeft === 0;

  return (
    <div className="app-wrapper">
      <ThemeToggler onToggle={handleThemeToggle} />
      <Challenge
        isGameOver={isGameOver}
        onHit={handleHit}
        onMiss={handleMiss}
        onTryAgain={handleTryAgain}
        score={score}
      />
      <Status chancesLeft={chancesLeft} score={score} />
    </div>
  );
}

export default App;
