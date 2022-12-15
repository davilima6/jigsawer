import './Answer.css';

type Props = {
  disabled: boolean;
  onSubmit: (input: string) => void;
  onGameOver: () => void;
};

const INPUT_NAME = 'answer';
const BUTTON_RESET_LABEL = 'Try again';
const BUTTON_SUBMIT_LABEL = 'Check answer';

function Answer({ disabled, onSubmit, onGameOver }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (disabled) {
      onGameOver();
      return;
    }

    const data = new FormData(event.currentTarget);
    const input = data.get(INPUT_NAME);

    if (input === null || input instanceof File || input.trim() === '') {
      return;
    }

    onSubmit(input.trim());
  }

  const buttonLabel = disabled ? BUTTON_RESET_LABEL : BUTTON_SUBMIT_LABEL;
  const buttonClassName = disabled ? 'reset' : 'submit';

  return (
    <section className="answer-wrapper">
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor={INPUT_NAME}>
          <input name={INPUT_NAME} id={INPUT_NAME} disabled={disabled} placeholder="Type your answer here" />
        </label>
        <button className={buttonClassName}>{buttonLabel}</button>
      </form>
    </section>
  );
}

export default Answer;
