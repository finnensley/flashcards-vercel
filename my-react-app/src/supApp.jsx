import "./App.css";
import MyForm from "./supMyForm.jsx";
import FlashcardLoader from "./supFlashcardLoader.jsx";
import "./MyForm.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import SignIn from "./supSignIn.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Toggle from "./toggle.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && showSignIn) {
      setShowSignIn(false);
    }
  }, [user, showSignIn]);

  return (
    <BrowserRouter>
      <div>
        <div className="container">
          {user && (
            <button id="signOut" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          )}
          <header className="header">
            <h1>DevFlashCards</h1>
            {/* <button id="toggleModeBtn">💡</button> */}
            <Toggle />
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <nav>
                    {!user && (
                      <span style={{ marginLeft: 16, textShadow: "0 2px 8px #00000071", fontWeight: "bold", fontSize: "large"}}> 
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowSignIn(true);
                          }}
                        >
                          Sign in 
                        </a>{" "}
                        to view custom flashcards.
                      </span>
                    )}
                  </nav>

                  <div className="flashcard-container">
                    <FlashcardLoader user={user} />
                  </div>

                  <nav>
                    <Link to="/MyForm" style={{ fontWeight: "bold", fontSize: "large"}} >Create Custom Flashcards</Link>
                  </nav>
                </>
              }
            />
            <Route
              path="/MyForm"
              element={
                <div className="create-flashcard">
                  <h2>Create Custom Flashcards</h2>
                  {!user && (
                    <div
                      id="signIn"
                      style={{
                        color: "rgba(75, 60, 143, 0.77)",
                        marginBottom: "1em",
                      }}
                    >
                      Please{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowSignIn(true);
                        }}
                      >
                        sign in
                      </a>{" "}
                      to create a flashcard.
                    </div>
                  )}
                  <div
                    style={{
                      opacity: user ? 1 : 0.5,
                      pointerEvents: user ? "auto" : "none",
                    }}
                  >
                    <MyForm user={user} />
                  </div>
                  <br />
                  <Link to="/" style={{ marginLeft: 16, fontWeight: "bold", fontSize: "large", color: "white" }}>
                    Back To Flashcards
                  </Link>
                </div>
              }
            />
          </Routes>
          {/* Modal for SignIn */}
          {showSignIn && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: 32,
                  borderRadius: 12,
                  minWidth: 320,
                }}
              >
                <button
                  style={{ float: "right" }}
                  onClick={() => setShowSignIn(false)}
                >
                  X
                </button>
                <SignIn />
              </div>
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

//Always use pnpm to run to be compatible with Supabase Auth UI
// In terminal: pnpm run dev
