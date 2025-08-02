# 📰 CurrentNews

A simple and responsive web app that displays the latest news from around the world using category and country filters.

---

## 🚀 Tech Stack

- ⚛️ **React** — Frontend library for building UI.
- 🎨 **Tailwind CSS** — Utility-first CSS framework for styling.
- 🧩 **shadcn/ui** — Pre-built UI components.
- 📡 **Axios** — For fetching data from the API.
- 📰 **NewsAPI** — Source of global news data.

---

## ✨ Features

- Filter news by **country** and **category**
- Real-time search functionality
- Fully responsive layout for all devices
- Clean and modern UI
- Uses a real news API

---

## 📦 Setup Instructions

```bash
git clone https://github.com/your-username/CurrentNews.git
cd CurrentNews
npm install
npm run dev
🔑 Environment Variables
Create a .env file in the root and add your News API key:

env
Copy
Edit
VITE_NEWS_API_KEY=your_api_key_here
🌍 API Used
bash
Copy
Edit
https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=YOUR_API_KEY
👨‍💻 Developed By
Reda Salem
Frontend Developer | Passionate about self-learning and building real-world projects.

🌐 Live Demo
Coming soon on Vercel

📸 Preview
(Add a screenshot of the app here)

⚠️ Note on API Deployment
If the news data does not show on the deployed version, it might be due to CORS restrictions by NewsAPI. Consider using a proxy server if needed.

yaml
Copy
Edit
