# Scoundrel Solo Dungeon Crawl

A dark, atmospheric dungeon crawler game built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Immersive Gameplay**: Experience a realistic dungeon crawl with dynamic lighting and sound effects.
- **Leaderboard**: Compete with other players for the top score.
- **Authentication**: Secure login and signup powered by Better-Auth.
- **Responsive Design**: Play on desktop or mobile.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database (Supabase recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd scoundrel-solo-dungeon-crawl
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   BETTER_AUTH_SECRET=your_random_secret
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```

4. Push the database schema:

   ```bash
   npx drizzle-kit push
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License.
