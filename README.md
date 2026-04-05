# MO Marketplace – Frontend

This is the frontend application for the MO Marketplace full-stack assessment.

The app is built using React, Vite, and TypeScript, and connects to a NestJS backend API.

Main Project Repository

For full project details (architecture, backend, deployment, etc.), refer to the main repository:

Backend (Main): https://github.com/your-username/mo-marketplace-api

## Tech Stack
- React (Vite + TypeScript)
- React Router
- Axios
- tailwind
- shadcn
- React-Query
- Zustand
- React Hook Form + Zod

## Running the Project Locally
#### Prerequisites
- Node.js (v20+)
- npm (v9+)
1. Clone the Repository
- git clone https://github.com/your-username/mo-marketplace-web
- cd mo-marketplace-web
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the root directory:

VITE_API_BASE_URL=http://localhost:3000

Make sure the backend server is running on this URL.

4. Start the Development Server
-npm run dev
5. Open in Browser

http://localhost:5173

## Notes
- Ensure the backend is running before starting the frontend
- API base URL should match your backend environment
- Product images are served from AWS S3 via backend responses