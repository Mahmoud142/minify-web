# 🌟 Minify - High-Performance URL Shortener & Linktree Builder

A clean, glassmorphic Single Page Application (SPA) and customizable Linktree builder built with **React 19**, **TypeScript**, and **Redux Toolkit**. Designed with an intermediate redirection page, interactive QR generation, and clean visitor analytics.

🔗 **Production Live Site:** [minifyapp.vercel.app](https://minifyapp.vercel.app/)  
🔗 **API Backend Codebase:** [github.com/Mahmoud142/minify-api](https://github.com/Mahmoud142/minify-api) (NestJS + MongoDB on AWS EC2)

---

## 📸 Application Showcase

### 1. Landing Interface
*Clean glassmorphic entry gate. Anonymous visitors can shorten links instantly, while logged-in users bypass this view via Redux Auth guards.*

![Public Landing Page](public/screenshots/landing.png)

---

### 2. URL Shortener Dashboard
*Full link lifecycle management dashboard: custom aliases, instant QR code rendering, and live click tracking.*

![URL Shortener Dashboard](public/screenshots/dashboard.png)

---

### 3. Customizable Bio-Link Builder (Linktree)
*Interactive custom builder for creating real-time editable "link-in-bio" profile trees with theme settings and social buttons.*

![Customizable Bio Page Builder](public/screenshots/bio_dashboard.png)

---

### 4. Published Profile Gate
*High-performance published visitor view containing responsive social icons, brand redirections, and unified profile links.*

![Interactive Live Bio Page](public/screenshots/bio_landing.png)

---

### 5. Audience Analytics
*Visual data graphs tracking user clicks, operating systems, and browser statistics.*

![Advanced Application Features](public/screenshots/features.png)

---

## ⚙️ How It Works (Technical Highlights)

Here are the key technical challenges solved in this project:

### 1. Vercel Reverse Proxy (Bypassing Browser Mixed Content Blocks)
**The Problem:** Browsers strictly block secure HTTPS sites (`https://minifyapp.vercel.app`) from calling insecure HTTP APIs (`http://13.61.175.114/url/shorten`) due to Mixed Content restrictions.  
**The Solution:** Instead of paying for a custom domain SSL on AWS immediately, I configured a reverse proxy in `vercel.json`. This securely routes all `/api/*` traffic to the backend under the hood, completely bypassing the browser block:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://13.61.175.114/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Dynamic API Base Client
To make local development seamless while supporting production deployments, the API client automatically resolves the target URL based on the environment:
```typescript
const isProd = import.meta.env.PROD;
const API_BASE_URL = isProd
    ? "/api"
    : (import.meta.env.VITE_API_BASE_URL || "http://13.61.175.114").replace(/\/+$/, "");
```

---

## ⚡ Performance & Security Features

### 1. GPU-Accelerated Animations (60 FPS)
To ensure the glassmorphic dashboards and transitional pages render smoothly on mobile devices, all intensive animations utilize CSS hardware acceleration (`transform: translate3d`) and `will-change` properties. This delegates layout rendering to the GPU and avoids high-cost CPU reflows.

### 2. Clean Redux Toolkit State Management
Uses Redux Toolkit with async thunks to handle non-blocking, asynchronous backend updates. State is updated atomically, ensuring the UI remains highly responsive without volatile re-renders.

### 3. Secure JWT Interceptor & Route Guards
- **Automatic Interceptor:** Outgoing fetch calls automatically read the JWT from LocalStorage and inject it into the `Authorization: Bearer` header.
- **Route Guards:** Uses nested React Router layouts as route guards. It evaluates token verification at the top-level before allowing access to dashboard subroutes.

---

## 🗺️ System Architecture

### 1. 🚀 API & State Management Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Client Browser
    participant Store as Redux Toolkit (State)
    participant Client as ApiClient (Fetch Engine)
    participant Proxy as Vercel Edge Proxy (HTTPS)
    participant BE as NestJS Backend (HTTP on EC2)
    participant DB as MongoDB Atlas

    User->>Store: Submits url "https://example.com" + Custom Alias
    Store->>Client: Triggers shortenUrlAsync thunk
    Note over Client: Detects PROD mode -> prefixes endpoint with "/api"
    Client->>Proxy: POST /api/url/shorten (Secure HTTPS)
    Note over Proxy: Server-side proxy redirects to NestJS host
    Proxy->>BE: Forward request to http://13.61.175.114/url/shorten
    BE->>DB: Stores URL schema & generates custom shortCode
    DB-->>BE: Acknowledges store completion
    BE-->>Proxy: Returns response JSON with shortCode
    Proxy-->>Client: Passes response safely to browser
    Client->>Store: Dispatches fulfilled action (injects new URL into state)
    Note over Store: UI components react to state change in real-time
    Store-->>User: Renders glassmorphic card & exposes copy-to-clipboard button
```

---

### 2. 🔄 Intermediate Redirection Gateway

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Visitor
    participant router as React Router (index.html)
    participant UI as Redirection Page (Loader)
    participant BE as NestJS Redirection Service
    actor Target as Destination Website

    Visitor->>router: Requests https://minifyapp.vercel.app/min.fy/oO-llw
    Note over router: SPA catches path -> mounts Redirection Component
    router->>UI: Renders spinner + "Redirecting you..." loading screen
    Note over UI: Triggers window.location.replace()
    UI->>Visitor: Replaces top-level window URL
    Visitor->>BE: Navigates directly to http://13.61.175.114/url/oO-llw
    Note over BE: Middleware logs IP, Referrer, User-Agent, & Geolocation
    BE-->>Visitor: Responds with HTTP 302 Found (Redirect Header)
    Visitor->>Target: Automatically lands on Destination Website
```

---

## 🛠 Tech Stack

- **Core Engine:** React 19, TypeScript, Vite (asset bundling, ES modules)
- **State Management:** Redux Toolkit (Thunks, Slices)
- **Styles:** Modular CSS with Glassmorphism
- **Routing:** React Router 7 layouts and guards

---

## 📂 Project Structure

```txt
minify-web/
├── public/
│   └── screenshots/         # Application showcase screenshots
├── src/
│   ├── app/                 # Global Redux store & hooks
│   ├── components/          # Shared components (QrModal, Navbar, etc.)
│   ├── features/            # Feature slices & selectors (Auth, Urls)
│   ├── layouts/             # Layout frames (AuthLayout)
│   ├── lib/                 # Core API Client wrapper
│   ├── pages/
│   │   ├── Redirection.tsx  # Redirection transition resolver
│   │   ├── Home.tsx         # Landing page with Redux Auth guard
│   │   ├── Dashboard.tsx    # Shortener and QR management panel
│   │   └── Analytics.tsx    # Live analytics metrics board
│   └── routes/              # Protected & public routing gates
└── vercel.json              # Edge Proxy & SPA client fallback rules
```
