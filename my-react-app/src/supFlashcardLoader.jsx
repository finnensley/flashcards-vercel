import React, { useState } from "react";
import "./FlashcardLoader.css";
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient.js";

const apiKey = "oqqFU5lnrqOeNJIXJgwJOd8aVjpmKLXaX4wN8xrh";
const urls = {
  Linux: `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10&category=linux`,
  HTML: `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10&category=html`,
  React: `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10&category=react`,
  DevOps: `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10&category=devops`,
  Javascript: "Custom",
  Custom: "Custom",
};

/*Add CSS, if find api*/

function escapeHTML(str) {
  if (!str) return "";
  // return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return str;
}

function FlashcardLoader({ user }) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [flipped, setFlipped] = useState({});
  const [selected, setSelected] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  async function fetchQuiz(category) {
    try {
      if (category === "Custom") {
        if(!user) {
          alert("Please sign in to view your custom flashcards.")
          return;
        }
      }
      let questionsData = [];
      let answerData = [];
      //If local JS and Custom, fetch both questions and answers and combine, can delete this if rework tables in db to one table with both q's and a's
      if (category === "Javascript") {
        const { data: jsQuestions, error: jsError } = await supabase
          .rpc('get_random_js_questions', { limit_count: 10 });
        if (jsError) throw jsError;

        const { data: jsAnswers, error: aError } = await supabase
          .from("flashcard_js_answers")
          .select("*")
            if (aError) throw aError;

        questionsData = jsQuestions;
        answerData = jsAnswers;
      } else if (category === "Custom") {
        const { data: customQuestions, error: qError } = await supabase
          .rpc('get_random_custom_questions', { uid: user.id, limit_count: 10 });
        if (qError) throw qError;

        const { data: customAnswers, error: aError } = await supabase
          .from("flashcard_custom_answers")
          .select("*");
        if (aError) throw aError;

        questionsData = customQuestions;
        answerData = customAnswers;
      } else {
        // For API categories, just set questions
        const response = await fetch(urls[category]);
        const data = await response.json();
        setQuestions(Array.isArray(data) ? data : []);
        setError("");
        setCurrentIdx(0);
        return;
      }

      // Combine answers with questions
      const combined = questionsData.map((q) => ({
        ...q,
        answers: answerData
          .filter((a) => a.question_id === q.question_id)
          .reduce((acc, a) => {
            acc[String(a.option_id)] = a.option_text;
            return acc;
          }, {}),

        correct_answers: answerData
          .filter((a) => a.question_id === q.question_id)
          .reduce((acc, a) => {
            acc[String(a.option_id)] = a.is_correct ? "true" : "false";
            return acc;
          }, {}),
      }));
      setQuestions(combined);
      setError("");
      setCurrentIdx(0); // Always start at first card
    } catch (err) {
      setError(err.message);
      setQuestions([]);
    }
  }

  function handleClick(category) {
    // For local categories, pass the string directily
    if (category === "Javascript" || category === "Custom") {
      fetchQuiz(category);
    } else {
      fetchQuiz([category]);
    }
  }

  function handleSelection(idx) {
    setFlipped((prev) => ({ ...prev, [idx]: true }));
  }

  function handleFlipBack(idx) {
    setFlipped((prev) => ({ ...prev, [idx]: false }));
    setSelected((prev) => ({ ...prev, [idx]: "" })); // Resets to Choose One:
  }

  return (
    <div>
      <h2>Choose A Category: </h2>
      <p>10 questions will appear 1 at a time</p>
      {/* loops through all the keys of the urls object{Linux, HTML, etc.} */}
      {/* for each key it creates a button with the category name as its label */}
      {/* onClick handler calls handleClick(cat), which fetches data for that category) */}
      {Object.keys(urls).map((cat) => (
        <motion.button
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          id="categoryBtns"
          key={cat}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </motion.button>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {questions.length > 0 && questions[currentIdx] && (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="question-block" key={currentIdx}>
              <div
                className={`question-block-inner${
                  flipped[currentIdx] ? " flipped" : ""
                }`}
              >
                <div className="question-block-front">
                  <h3>
                    Question {currentIdx + 1}:{" "}
                    {questions[currentIdx].question_text ||
                      questions[currentIdx].question}
                  </h3>
                  <br />
                  <div className="choices">
                    Answer Choices:
                    <select
                      value={selected[currentIdx] || ""}
                      onChange={(e) => {
                        setSelected((prev) => ({
                          ...prev,
                          [currentIdx]: e.target.value,
                        }));
                        handleSelection(currentIdx);
                      }}
                    >
                      <option value="">Choose one:</option>
                      {questions[currentIdx].answers &&
                        Object.keys(questions[currentIdx].answers).map((key) =>
                          questions[currentIdx].answers[key] ? (
                            <option key={key} value={escapeHTML(key)}>
                              {escapeHTML(questions[currentIdx].answers[key])}
                            </option>
                          ) : null
                        )}
                    </select>
                  </div>
                  <div className="row">
                    <div className="category">
                      Category: {questions[currentIdx].category}
                    </div>
                    <div className="level">
                      Level: {questions[currentIdx].difficulty}
                    </div>
                  </div>
                  {/* <div>Description: {q.description || ""}</div> */}
                </div>
                <div
                  className="question-block-back"
                  onClick={() => handleFlipBack(currentIdx)}
                >
                  <div className="question-repeated">
                    <h2>
                      {/* Question {currentIdx + 1}: */}{" "}
                      {questions[currentIdx].question_text ||
                        questions[currentIdx].question}
                    </h2>
                  </div>
                  <div className="answer-center">
                    {/* Correct Answer: {" "} */}
                    {(() => {
                      const correctKey = Object.keys(
                        questions[currentIdx].correct_answers
                      ).find(
                        (key) =>
                          questions[currentIdx].correct_answers[key] === "true"
                      );
                      if (!correctKey) return "N/A";
                      // Remove "_correct" from the key to get the answer key
                      const answerKey = correctKey.replace("_correct", "");
                      return questions[currentIdx].answers[answerKey] || "N/A";
                    })()}
                  </div>
                  <p className="flip-to-front">(Click to flip back)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className="next-and-prevbtns">
          {questions.length > 0 && currentIdx > 0 && (
            <motion.button
              id="previous-button"
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentIdx(currentIdx - 1)}
            >
              Previous
            </motion.button>
          )}

          {questions.length > 0 && currentIdx < questions.length - 1 && (
            <motion.button
              id="next-button"
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              Next
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlashcardLoader;
