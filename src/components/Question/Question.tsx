type Props = {
  question: string;
};

function Question({ question }: Props) {
  return (
    <section className="question-wrapper">
      <blockquote>{question}</blockquote>
    </section>
  );
}

export default Question;
