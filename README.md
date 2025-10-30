Talentloom - Hackathon Project Setup
===========================

This repository contains the frontend for the application, built using **Vite**, **React 19**, **TypeScript**, and **TailwindCSS**.\
It's fast, modular, and optimized for production deployment with Docker.

* * * * *

Tech Stack
-------------

-   **Vite** --- lightning-fast build tool

-   **React 19** --- modern UI library

-   **TypeScript** --- static typing for cleaner code

-   **TailwindCSS** --- utility-first CSS framework

-   **Redux Toolkit** --- predictable state management

-   **React Router v7** --- client-side routing

-   **Axios** --- for API communication

* * * * *

Project Setup
----------------

### 1\. Clone the repository

`git clone https://github.com/your-username/your-repo.git
cd your-repo`

### 2\. Install dependencies

`npm install`

### 3\. Run the development server

`npm run dev`

Then open your browser and go to:

`http://localhost:5173`

* * * * *

Build for Production
------------------------

`npm run build`

The optimized static files will be generated in the `dist/` folder.

You can preview the production build locally using:

`npm run preview`

* * * * *

🐳 Running with Docker
----------------------

### Build the image

`docker build -t vite-frontend .`

### Run the container

`docker run -p 4173:4173 vite-frontend`

Now your app will be available at:

`http://localhost:4173`

* * * * *

Useful Commands
------------------

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build production files |

* * * * *

Environment Variables
------------------------

If your app uses environment variables (like API URLs), create a `.env` file in the root:

`VITE_API_URL=https://your-api-url.com`

Access them in your code with:

`import.meta.env.VITE_API_URL`

* * * * *

* * * * *
Deployment
-------------

The Dockerfile included builds and serves the app using `serve` on port `4173`.\
This is ideal for deploying on platforms like **Vercel**, **Render**, **AWS**, or **Docker Hub**.

* * * * *

Author
------------

**Prince Chaurasia**\
Full Stack Developer - React | Next.js | TypeScript | Node.js\
[LinkedIn](https://linkedin.com/in/princechaurasia) | [GitHub](https://github.com/mr-dev-prince)