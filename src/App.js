import { useState } from "react";
import QuestionList from "./component/QuestionList/QuestionList";
import "./style.css";
import shapeTop from "./asset/blob 5.png";
import shapeBottom from "./asset/blob 5 (1).png";
export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [combination, setCombination] = useState({
    difficulty: "",
    category: "",
    type: "",
  });

  function handleGameStart() {
    setStartGame((prevState) => !prevState);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCombination((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <main>
      <img className="shape-top" src={shapeTop} alt="Shape Top" />
      {startGame ? (
        <section className="game-container">
          <QuestionList
            combination={combination}
            handleGameStart={handleGameStart}
          />
        </section>
      ) : (
        <section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p className="game-text">
            Answer the questions and test your knowledge!
          </p>

          <div className="gameOptions-container">
            <div className="select-container">
              <label className="custom-label" htmlFor="difficulty">
                Difficulty
              </label>
              <select
                name="difficulty"
                id="difficulty"
                value={combination.difficulty}
                className="custom-select"
                onChange={handleChange}
              >
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="select-container">
              <label className="custom-label" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={combination.category}
                className="custom-select"
                onChange={handleChange}
              >
                <option value="any">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">
                  Entertainment: Musicals &amp; Theatres
                </option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">
                  Entertainment: Japanese Anime &amp; Manga
                </option>
                <option value="32">
                  Entertainment: Cartoon &amp; Animations
                </option>
              </select>
            </div>
            <div className="select-container">
              <label className="custom-label" htmlFor="type">
                Type
              </label>
              <select
                name="type"
                id="type"
                value={combination.type}
                className="custom-select"
                onChange={handleChange}
              >
                <option value="any">Any</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={handleGameStart}>
            Start Game
          </button>
        </section>
      )}
      <img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />
      <footer>Developed by Shreya</footer> ;
    </main>
  );
}
