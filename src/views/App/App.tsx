import { useState } from 'react';

import Challenge from '../../components/Challenge';
import Status from '../../components/Status';
import './App.css';

const INITIAL_POINTS = 0;
const INITIAL_CHANCES_LEFT = 3;

function App() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [chancesLeft, setChancesLeft] = useState(INITIAL_CHANCES_LEFT);

  function handleHit() {
    setPoints((pointsCur) => pointsCur + 1);
  }

  function handleMiss() {
    if (chancesLeft === 0) {
      return;
    }

    setChancesLeft((chancesLeftCur) => chancesLeftCur - 1);
  }

  function handleGameOver() {
    setPoints(INITIAL_POINTS);
    setChancesLeft(INITIAL_CHANCES_LEFT);
  }

  const disabled = chancesLeft === 0;

  return (
    <div className="app-wrapper">
      <Challenge onHit={handleHit} onMiss={handleMiss} onGameOver={handleGameOver} disabled={disabled} />
      <Status chancesLeft={chancesLeft} points={points} />
    </div>
  );
}

export default App;
