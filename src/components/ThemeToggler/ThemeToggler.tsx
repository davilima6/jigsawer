import { useEffect, useRef, useState } from 'react';

import './ThemeToggler.css';

type Props = {
  onToggle: () => void;
};

const INPUT_NAME = 'theme-toggler';
const ENABLE_LIGHT_MODE_LABEL = 'Enable day mode';
const ENABLE_DARK_MODE_LABEL = 'Enable night mode';

function ThemeToggler({ onToggle }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputLabel, setInputLabel] = useState(ENABLE_DARK_MODE_LABEL);

  useEffect(() => {
    if (!window?.matchMedia) {
      return;
    }

    const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isSystemDarkMode) {
      inputRef.current?.click();
    }
  }, []);

  function handleClick(): void {
    onToggle();
    setInputLabel(inputLabel === ENABLE_LIGHT_MODE_LABEL ? ENABLE_DARK_MODE_LABEL : ENABLE_LIGHT_MODE_LABEL);
  }

  return (
    <div className="theme-toggler-wrapper" role="button" tabIndex={0} onClick={handleClick}>
      <label htmlFor={INPUT_NAME} aria-label={inputLabel} title={inputLabel}>
        <input type="checkbox" id={INPUT_NAME} name={INPUT_NAME} ref={inputRef} />
      </label>
    </div>
  );
}

export default ThemeToggler;
