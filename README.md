# React + Vite: Programming Flashcards
# Set of flashcards for programmers on different topics, that can easily be reviewed daily and quickly. 


# Goals: 
# Learn organization of React files
# Use W3 tutorial where needed
# Answer scoring - with localStorage
# Connect Go: PostgreSQL database and API created for JS q/a's
# A page to create flashcards using categorizes, with those cards always displayed, with the option to hide or 5-10 created flashcards plus api 10 populate when click button? 

## Challenges:
## Currently, sign in to view page and gives access to create custom cards. Can adjust to add a user.id to each card and at sign in only see custom cards made by that user plus other apis. 

## React app only runs if npm run dev and go server is running for JS/Custom tables, go run main.go. If hosted on vercel and db to Supabase, does that fix running it locally. Can Vercel be used as a server? 

## Type will need to be entered into Go struct to work, currently sends no data to tables - is it even needed?

## if have cards up from one category, if click another category cards don't fade in just appear, they also stay on the current side you were on before, i.e. if on answer side for HTML card, click DevOp link it will show first card with answer side flipped.


# Align front of flashcard question and answer choice to the right more.

# make the motion.button work when click new category in the middle of another category. Only works when clicking with no category pulled up.

# Shows correct answer, updates score.

# check to see if it is worth it to change endpoint and update database to have questions and answers in same table. 


# APIs used:
## api token for QuizAPI.io, oqqFU5lnrqOeNJIXJgwJOd8aVjpmKLXaX4wN8xrh

## quiz api is a simple HTTP REST API for technical quizzes

## https://www.w3schools.com/howto/howto_css_flip_box.asp
## try flip-box to flip card vertically or horizontally


## Goals Completed
# Convert HTML/CSS/JS files to React project
# Explore animations, framer-motion and motion
# Pull apis from different sources to populate questions
# Cards interactive

## Challenges Completed
# add flipbox animation and animateFlashcard to each card

# each card opens on its own page with back/next buttons

# build backend server, Node.js Express to connect JS Postgres Database, did this but already had Go server and did not need. Still used both to check that they worked.

# use buttons for answer choices beneath cards, when click answer card flips to back. 

# Next and Previous button layouts to be justify-content: space-between. Add classNames to the buttons.

# fix correct a or 1 to be the correct answer 

# Would custom created questions, stay in local storage or be updated in a database. - start with localStorage, then create a table for custom q's/a's in postgre table for JS, pull custom endpoints. --Need to set up a POST router, potentially use the same api already created to push created data to db? 

