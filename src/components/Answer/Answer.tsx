import { useRef } from 'react';

import './Answer.css';

type Props = {
  onSubmit: (input: string) => void;
};

const INPUT_NAME = 'answer';
export const BUTTON_TITLE = 'Check answer';
export const INPUT_PLACEHOLDER = 'Type your answer here';

function Answer({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    inputRef.current?.focus();

    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const input = data.get(INPUT_NAME);

    if (input === null || input instanceof File || input.trim() === '') {
      return;
    }

    onSubmit(input.trim());
    formEl.reset();
  }

  return (
    <section className="answer-wrapper">
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor={INPUT_NAME} aria-label={INPUT_PLACEHOLDER}>
          <input name={INPUT_NAME} id={INPUT_NAME} ref={inputRef} placeholder={INPUT_PLACEHOLDER} autoFocus />
        </label>
        <button className="submit">{BUTTON_TITLE}</button>
      </form>
    </section>
  );
}

export default Answer;
