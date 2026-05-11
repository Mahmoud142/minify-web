# Minify Web

React, TypeScript, Vite frontend for Minify.

## Backend Connection

Create a local `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The API client combines that base URL with endpoint paths like `/auth/login`.

Only variables that start with `VITE_` are available in Vite frontend code. This is fine for a public API base URL, but never put private secrets, database passwords, or JWT signing secrets in frontend env files.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
