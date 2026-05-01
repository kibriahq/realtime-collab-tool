# Collab Tool

A real-time collaborative workspace application that allows users to create teams, coordinate projects, and co-edit documents seamlessly. Built with a modern tech stack focused on high-performance collaboration and rich text editing.

## Features

- **Real-time Collaboration**: Co-edit documents simultaneously with other team members in real-time, complete with multiplayer cursors.
- **Rich Text Editing**: Notion-style block-based editor supporting formatting, headings, lists, tables, tasks, and more.
- **Team & Project Management**: Organize your work by creating teams and dividing work into projects.
- **Authentication**: Secure user signup, login, and access control.

## Tech Stack

### Frontend (Client)
- **Framework**: [Next.js](https://nextjs.org/) & [React](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Editor**: [Tiptap](https://tiptap.dev/) & [Yjs](https://yjs.dev/) for real-time collaboration and cursors
- **State Management**: [Easy Peasy](https://easy-peasy.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Server)
- **Framework**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Collaboration Server**: [Hocuspocus](https://tiptap.dev/hocuspocus) (Yjs WebSocket backend integration)
- **Authentication**: JWT (`jsonwebtoken`) & `bcryptjs`
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v20+)
- PostgreSQL database
- `pnpm` package manager (recommended)

### Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd collab-tool
   ```

2. **Setup the Backend**

   ```bash
   cd server
   pnpm install
   ```

   - Set up your `.env` file with database credentials and JWT secret.
   - Run database migrations:
     ```bash
     pnpm run migrate
     ```
   - Start the development server (runs on `http://localhost:3000` or configured port):
     ```bash
     pnpm run dev
     ```

3. **Setup the Frontend**

   Open a new terminal window:
   ```bash
   cd client
   pnpm install
   ```
   
   - Start the Next.js development server:
     ```bash
     pnpm run dev
     ```

## Project Structure

- `/client` - Next.js frontend application containing pages, components, and the Tiptap collaborative editor.
- `/server` - Express backend application handling REST API routes, authentication, database migrations, and the Hocuspocus WebSocket collaboration server.

## Future Plans

- Interactive Whiteboarding
- Collaborative Code editing
- Document suggestions, comments
