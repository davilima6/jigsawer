import './Question.css';

type Props = {
  question: string;
};

function Question({ question }: Props) {
  return (
    <div className="question-wrapper">
      <blockquote>{question}</blockquote>
    </div>
  );
}

export default Question;
