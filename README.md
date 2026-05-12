# Minify Web

A premium, high-performance URL shortener and bio-link builder built with **React 19**, **TypeScript**, and **Vite**.

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Modular CSS with Glassmorphism & Fluid Animations
- **Icons:** Lucide React
- **Routing:** React Router 7

## 🚀 Key Features

- **Advanced Shortening:** Support for custom aliases and real-time shortening logic.
- **Bio-Link Builder:** Customizable "link-in-bio" pages with social integration and profile management.
- **Real-time Analytics:** Integrated tracking for link performance and audience insights.
- **Dynamic QR Generation:** Automatic QR code generation for every shortened link.
- **Secure Auth Flow:** Complete authentication system including email verification and password recovery.

## ⚙️ Backend Connection

To connect the frontend to the Minify API, create a local `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> [!IMPORTANT]
> The API client automatically combines the base URL with endpoint paths (e.g., `/auth/login`). Only variables prefixed with `VITE_` are exposed to the frontend. Never store private secrets or database credentials in this file.

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start the development server. |
| `npm run build` | Compile TypeScript and build for production. |
| `npm run lint` | Run ESLint to maintain code quality. |
| `npm run preview` | Preview the production build locally. |

## 📂 Project Structure

- `src/app`: Redux store and global state configuration.
- `src/components`: Shared UI components and navigation.
- `src/features`: Feature-specific logic and Redux slices (e.g., Auth).
- `src/layouts`: Core page layouts (Auth, Dashboard).
- `src/pages`: Application views and page-specific logic.
- `src/lib`: Core utilities and API client configuration.
- `src/routes`: Route definitions and protection logic.

---

Built by [Mahmoud](https://github.com/Mahmoud142)
