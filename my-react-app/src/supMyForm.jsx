import React, { useState } from "react";
import { supabase } from "./supabaseClient.js";

// Add useState for each input.
// Add value and onChange to each input/select.
// Use the state values in your submit handler.

function MyForm({ user }) {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correct, setCorrect] = useState("");
  // const [success, setSuccess] = useState(''); // use for inline display

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to add a flashcard.");
      return;
    }
    // Insert question
    const { data: questionData, error: qError } = await supabase
      .from("flashcard_custom_questions")
      .insert([{ question_text: question, category, difficulty }])
      .select()
      .single();
    if (qError) {
      alert(qError.message);
      return;
    }
    const question_id = questionData.question_id;

    const answers = [
      {
        option_text: answerA,
        is_correct: correct === "a",
        question_id: question_id,
      },
      {
        option_text: answerB,
        is_correct: correct === "b",
        question_id: question_id,
      },
      {
        option_text: answerC,
        is_correct: correct === "c",
        question_id: question_id,
      },
      {
        option_text: answerD,
        is_correct: correct === "d",
        question_id: question_id,
      },
    ];

    const { error: aError } = await supabase
      .from("flashcard_custom_answers")
      .insert(answers);
    if (aError) {
      alert(aError.message);
      return;
    }
    alert("Flashcard saved successfully!");

    // reset form
    setCategory("");
    setQuestion("");
    setDifficulty("");
    setType("");
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setAnswerD("");
    setCorrect("");
  }

  return (
    <form id="createCard" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose One:</option>
          <option value="Linux">Linux</option>
          <option value="HTML">HTML</option>
          <option value="React">React</option>
          <option value="DevOps">DevOps</option>
          <option value="Javascript">Javascript</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="questionInput">Question:</label>
        <input
          type="text"
          id="questionInput"
          placeholder="Enter question or challenge:"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Choose One:</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="type">Type </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Choose One:</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="boolean">True or False</option>
        </select>
        <br />
        <label htmlFor="answer">Answer Options: </label>
        <input
          type="text"
          id="answer_a"
          placeholder="a) or true"
          value={answerA}
          onChange={(e) => setAnswerA(e.target.value)}
        />
        <input
          type="text"
          id="answer_b"
          placeholder="b) or false"
          value={answerB}
          onChange={(e) => setAnswerB(e.target.value)}
        />
        <input
          type="text"
          id="answer_c"
          placeholder="c)"
          value={answerC}
          onChange={(e) => setAnswerC(e.target.value)}
        />
        <input
          type="text"
          id="answer_d"
          placeholder="d)"
          value={answerD}
          onChange={(e) => setAnswerD(e.target.value)}
        />
      </div>
      <label htmlFor="correct">Correct Answer</label>
      <input
        type="text"
        id="true"
        placeholder="correct answer: a, b, c, or d"
        value={correct}
        onChange={(e) => setCorrect(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default MyForm;
