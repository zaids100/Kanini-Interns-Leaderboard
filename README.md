# Kanini Interns Leaderboard

A **dynamic leaderboard web app** built for Kanini interns — showcasing module-wise performance, overall scores, LeetCode counts, and certifications. Detailed intern profiles and interactive UI included.

[Live Demo](https://kanini-interns-leaderboard.vercel.app)

---

##  Tech Stack

| Frontend             | Backend                  | Media Storage        | Hosting        |
|----------------------|---------------------------|----------------------|----------------|
| React & Tailwind CSS | Node.js & MongoDB (via REST API) | Cloudinary for media | Vercel Deployment |

Security with JWT-based auth for protected intern dashboards.

---

##  Features

- User authentication (intern signup/login)
- Leaderboard with module-wise and overall scores
- Profile pages with certifications and metrics
- Responsive UI via Tailwind CSS
- Fully deployed and production-ready

---

##  Setup & Running Locally

```bash
git clone https://github.com/zaids100/Kanini-Interns-Leaderboard.git
cd Kanini-Interns-Leaderboard/backend
npm install
# Copy .env.example → .env and set variables (MONGO_URI, JWT_SECRET, CLOUDINARY creds)
npm start

# In a new terminal:
cd ../frontend
npm install
npm run dev