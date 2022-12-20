import { useRef } from 'react';

import './Answer.css';

type Props = {
  onSubmit: (input: string) => void;
};

const INPUT_NAME = 'answer';

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
        <label htmlFor={INPUT_NAME}>
          <input name={INPUT_NAME} id={INPUT_NAME} ref={inputRef} autoFocus placeholder="Type your answer here" />
        </label>
        <button className="submit">Check answer</button>
      </form>
    </section>
  );
}

export default Answer;
