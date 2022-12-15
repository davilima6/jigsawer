import { useState } from 'react';
import Challenge from '../../components/Challenge';
import Status from '../../components/Status';
import './App.css';

const INITIAL_CHANCES_AMOUNT = 3;

function App() {
  const [points, setPoints] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(INITIAL_CHANCES_AMOUNT);

  function handleHit() {
    setPoints((pointsCur) => pointsCur + 1);
  }

  function handleMiss() {
    setChancesLeft((chancesLeftCur) => chancesLeftCur - 1);
  }

  return (
    <>
      <Challenge onHit={handleHit} onMiss={handleMiss} />
      <Status chancesLeft={chancesLeft} points={points} />
    </>
  );
}

export default App;
