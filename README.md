# Quiz Builder

A Next.js application for creating and managing quizzes. Build custom quizzes with multiple choice questions.

## Features

- Create and edit quizzes with multiple choice questions
- Save drafts and publish when ready
- View all published quizzes
- Take quizzes and get the result
- Responsive design that works on desktop and mobile

## Tech Stack

- Next.js 15 Pages Router
- React
- Supabase (PostgreSQL database)
- TanStack Query
- Tailwind CSS
- Shadcn UI Components

## Prerequisites

- Node.js 16.x or later
- npm or yarn package manager
- Supabase account and project

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cvpfus/quiz-builder.git
   cd quiz-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Add your Supabase project URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses the following main tables in Supabase:

- `quizzes` - Stores quiz metadata (title, creator, published status)
- `questions` - Stores questions linked to quizzes
- `answers` - Stores multiple choice answers for each question
