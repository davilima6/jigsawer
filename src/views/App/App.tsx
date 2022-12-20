import { useState } from 'react';

import Challenge from '../../components/Challenge';
import Status from '../../components/Status';
import ThemeToggler from '../../components/ThemeToggler';
import './App.css';

const INITIAL_POINTS = 0;
const INITIAL_CHANCES_LEFT = 3;

function App() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [chancesLeft, setChancesLeft] = useState(INITIAL_CHANCES_LEFT);

  function handleHit(): void {
    setPoints((pointsCur) => pointsCur + 1);
  }

  function handleMiss(): void {
    if (chancesLeft === 0) {
      return;
    }

    setChancesLeft((chancesLeftCur) => chancesLeftCur - 1);
  }

  function handleGameOver(): void {
    setPoints(INITIAL_POINTS);
    setChancesLeft(INITIAL_CHANCES_LEFT);
  }

  function handleThemeToggle(): void {
    const { theme } = document.body.dataset;
    document.body.dataset.theme = theme === 'light' ? 'dark' : 'light';
  }

  const disabled = chancesLeft === 0;

  return (
    <div className="app-wrapper">
      <ThemeToggler onToggle={handleThemeToggle} />
      <Challenge onHit={handleHit} onMiss={handleMiss} onGameOver={handleGameOver} disabled={disabled} />
      <Status chancesLeft={chancesLeft} points={points} />
    </div>
  );
}

export default App;
