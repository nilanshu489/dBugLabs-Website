# dBug Labs Platform

Welcome to the **dBug Labs** project repository! This platform serves as the official website for dBug Labs, a technical club focused on Web Development, AI/ML, and more. 

## 🚀 Deployment Link

**Live Website:** [https://dbuglabs26.vercel.app/](https://dbuglabs26.vercel.app/)

## 🛠️ Tech Stack

This project is built using a modern, scalable web development stack:

- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **CMS:** Sanity Studio (for dynamic content like Events, Team members, etc.)
- **Deployment:** Vercel (Frontend & Server)

## 📂 Project Structure

- `/client` - The React frontend application.
- `/server` - The Node.js Express backend API (handles contact form submissions, etc.).
- `/sanity-studio` - The headless CMS schema and configuration to manage dynamic data.

## ⚙️ Running Locally

To run the project locally, you will need to start the client, server, and optionally the CMS studio.

### Prerequisites
- Node.js (v16+)
- npm or yarn

### 1. Client (Frontend)
```bash
cd client
npm install
npm run dev
```
The frontend should now be running on `http://localhost:5173`.

### 2. Server (Backend)
```bash
cd server
npm install
npm run dev
```

### 3. Sanity Studio (CMS)
```bash
cd sanity-studio
npm install
npm run dev
```

## 👥 Meet the Team
The platform auto-loads our core team members dynamically based on domains (Web Development, AI/ML, Corporate, etc.) using data from the Sanity CMS!

## 📝 License
This project is proprietary to dBug Labs.
