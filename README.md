## Assignment Overview

The goal of this assignment is to build a Quiz Builder application using Next.js, Tailwind CSS, and Supabase. The application should demonstrate your ability to work on both the front-end and back-end while handling APIs and showcasing multi-language support.

## Assignment : Quiz Builder

### Objective:

Develop a system where users can design quizzes with questions and answers, and allow others to take these quizzes and view their scores. with login and registration should also be included.

### Requirements:

1. User Authentication:

   - Implement login and registration using Supabase with email/password authentication.
   - Handle user session management securely.
   - Use Next.js API routes for authentication and interacting with Supabase.

2. Quiz Creation and Management:

   - Create a page for users to:
     - Add a quiz title.
     - Add multiple questions with multiple-choice answers.
     - Mark the correct answer for each question.
     - Display a list of quizzes created by the user with options to edit or delete.
     - Use APIs to interact with Supabase for saving and retrieving quiz data.
     - Support both English and Arabic languages.

3. Taking a Quiz:

   - Create a page for users to take quizzes.
   - Allow users to:
     - Select a quiz from the list.
     - Answer quiz questions and submit answers.
     - View their score along with the correct answers.
     - Fetch and validate data through Next.js API routes.

4. Front-End Implementation:

   - Build a responsive and user-friendly interface using Tailwind CSS.
   - Add routing for login/register, quiz management, and quiz-taking pages.
   - Include a language toggle for English and Arabic (be careful with rtl and ltr it is very important!).

5. Back-End Implementation:

   - Use Next.js API routes for all interactions with Supabase, including:
     - User authentication.
     - Quiz creation, retrieval, and management.
     - Handling quiz submissions and calculating scores.
   - Ensure proper validation and error handling.
