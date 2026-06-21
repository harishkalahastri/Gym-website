// Vercel Serverless Function entry point
// This re-exports the Express app so Vercel can handle /api/* routes
import app from '../backend/server.js';

export default app;
