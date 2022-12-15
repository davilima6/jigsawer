import './Answer.css';

type Props = {
  onAnswer: (input: string) => void;
};

const INPUT_NAME = 'answer';

function Answer({ onAnswer }: Props) {
  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const input = data.get(INPUT_NAME);

    if (input === null || input instanceof File) {
      return;
    }

    onAnswer(input);
  }

  return (
    <section className="answer-wrapper">
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor={INPUT_NAME}>
          <input name={INPUT_NAME} id={INPUT_NAME} />
        </label>
        <button>Send</button>
      </form>
    </section>
  );
}

export default Answer;
