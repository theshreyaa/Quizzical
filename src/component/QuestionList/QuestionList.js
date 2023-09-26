import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "../Question/Question";
import "./QuestionList.css";

export default function QuestionList({ combination, handleGameStart }) {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching

    fetch(
      `https://opentdb.com/api.php?amount=5&category=${combination.category}&difficulty=${combination.difficulty}&type=${combination.type}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          alert("No questions found for the selected options");
          handleGameStart();
        }
        setQuestionsArray(
          data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              selectedAnswer: "",
              showAnswer: false,
              showCorrectAnswer: false,
            };
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleAnswer(questionId, answer) {
    setQuestionsArray((prevState) =>
      prevState.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            selectedAnswer: answer,
          };
        }
        return question;
      })
    );
  }

  function reset() {
    setCheckAnswerBtn(false);
    setIsGameOver(false);
    handleGameStart();
  }
  const allQuestionsAnswered = questionsArray.every(
    (question) => question.selectedAnswer !== ""
  );
  function checkAnswerBtnHandler() {
    if (allQuestionsAnswered) {
      setIsGameOver(true);
      setCheckAnswerBtn((prevState) => !prevState);

      const correctAnswers = questionsArray.filter(
        (question) => question.correct_answer === question.selectedAnswer
      );
      setCorrectAnswersCount(correctAnswers.length);
    }

    setQuestionsArray((prevState) =>
      prevState.map((question) => {
        return {
          ...question,
          showAnswer: true,
          showCorrectAnswer: true,
        };
      })
    );
  }

  return (
    <main>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p className="loading-text">cooking up some questions for you...</p>
        </div>
      ) : (
        <section className="questionList-container">
          {questionsArray.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              handleAnswer={handleAnswer}
              correct_answer={question.correct_answer}
              incorrect_answer={question.incorrect_answers}
              question={question.question}
              showAnswer={question.showAnswer}
              selectedAnswer={question.selectedAnswer}
              showCorrectAnswer={question.showCorrectAnswer}
            />
          ))}
          <div className="bottom-container">
            <button
              className={`btn-primary ${
                allQuestionsAnswered
                  ? "btn-check-answers"
                  : "btn-check-answers-disabled"
              }`}
              onClick={isGameOver ? reset : checkAnswerBtnHandler}
            >
              {isGameOver ? "Play again" : "Check answers"}
            </button>

            <div className="correct-answers-text">
              {isGameOver && (
                <p> Your Correct Answers are {correctAnswersCount}/5</p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
