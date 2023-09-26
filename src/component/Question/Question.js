import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./Question.css";

export default function Question({
  id,
  combination,
  handleGameStart,
  handleAnswer,
  correct_answer,
  incorrect_answer,
  question,
  showAnswer,
  selectedAnswer,
  showCorrectAnswer,
}) {
  const incorrectAnswersElements = incorrect_answer.map((answer) => {
    const incorrectAnswerClassName = `
			${selectedAnswer === answer ? "question-btn-selected" : "question-btn"}
			${showAnswer && selectedAnswer === answer && "question-btn-incorrect"}`;
    return (
      <button
        key={nanoid()}
        className={incorrectAnswerClassName}
        onClick={() => handleAnswer(id, answer)}
      >
        {decode(answer)}
      </button>
    );
  });

  const correctAnswerClassName = ` ${
    selectedAnswer === correct_answer ? "question-btn-selected" : "question-btn"
  }
${showAnswer && "question-btn-correct"}`;

  const correctAnswerElement = (
    <button
      key={nanoid()}
      className={correctAnswerClassName}
      onClick={() => handleAnswer(id, correct_answer)}
    >
      {decode(correct_answer)}
    </button>
  );

  incorrectAnswersElements.push(correctAnswerElement);

  return (
    <article className="question-container">
      <div>
        <h3 className="question-text">{decode(question)}</h3>
        {incorrectAnswersElements}
      </div>
    </article>
  );
}
