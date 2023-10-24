# Next.js TypeScript Redux Auth Proxy Starter

Welcome to our Next.js project built with TypeScript, Redux Toolkit, NextAuth, Axios, and styled with TailwindCSS. This project uses a unique architecture where the Next.js client-side makes API calls to its own Next.js server-side. The server-side then acts as a proxy to communicate with the actual backend server, ensuring added security.

## 🛠️ Technologies

-   **Next.js**: A popular React framework that offers features like server-side rendering and static site generation.
-   **TypeScript**: Brings static typing to JavaScript, ensuring more robust code.
-   **Redux Toolkit**: Helps manage global state in a more efficient manner.
-   **NextAuth**: Provides authentication solutions, in this case, Google OAuth 2.0.
-   **Axios**: Promise-based HTTP client for making API calls.
-   **TailwindCSS**: A utility-first CSS framework for rapid UI development.

## 🚀 Getting Started

1. **Clone the repository**

    ```bash
    git clone [repository-link]
    ```

2. **Navigate to the project directory and install the dependencies**

    ```bash
    cd your-nextjs-project
    npm install
    ```

3. **Setup Environment Variables**

    - Rename `.env.local.example` to `.env.local`.
    - Update the variables in `.env.local` with your credentials.

4. **Run the development server**
    ```bash
    npm run dev
    ```

The project will start, and you can access it at `http://localhost:3000`.

## 📦 Deployment

Before deploying, ensure you've set up all necessary environment variables. Check out `.env.local.example` for a reference of the required variables.

[Include deployment steps based on where you want to deploy, e.g., Vercel, Netlify, or a custom server]

## 🙌 Acknowledgements

-   Thanks to the open-source community for the various packages and tools that made this project possible.
-   Shoutout to our awesome contributors and testers.

---

Made with ❤️ by [Johnny Alim Fury]
