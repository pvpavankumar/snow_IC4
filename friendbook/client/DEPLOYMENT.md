# Vercel deployment
This branch consolidates the Express API under the Next.js project in friendbook/client/server. The original friendbook/server directory is retained for reference; the Vercel app uses friendbook/client/server and does not start a separate backend. Both the UI and API use one origin.

Import this branch into Vercel with root directory `friendbook/client`, framework Next.js, Node.js 22, and the default npm install / npm run build commands.

In Vercel Project Settings → Environment Variables, add DATABASE (your existing MongoDB connection string, including database name) and JWT_SECRET (a cryptographically random secret of at least 32 bytes). Set both for Preview and Production, then redeploy. Never commit these values. NEXT_PUBLIC_API is optional and defaults to /api.

The existing database must allow connections from the deployment. Configure Atlas network access for your selected Vercel networking setup.

GET /api/health returns 200 only when the database connects and authentication is configured. It returns 503 while setup is incomplete without exposing secrets.

Verify registration, login, posting, editing, deletion, follows and likes using a test account. Friend requests, comments and password recovery remain unfinished.

Local development: cd friendbook/client, npm install, copy .env.example to .env.local and populate it, then npm run dev. No separate Express process is required.

## Validation status
A preview deployment was submitted to Vercel. Build status and runtime checks could not be verified because the Vercel connection denied access to the deployment scope. Registration, login, and database operations still require environment configuration and end-to-end validation. This branch is not yet verified for production.
