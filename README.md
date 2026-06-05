# Serve Sync POS - Landing Page & Admin Panel
Serve Sync POS is a lightweight, modern Point of Sale landing page integrated with a lead-generation system and a custom Admin Panel CMS. The backend is built with Node.js and Express, while the frontend leverages Tailwind CSS for a sleek, responsive design.
## 🚀 Features
### Frontend (Landing Page)
 * **Dynamic Content:** Hero titles and descriptions are fetched dynamically from the backend API.
 * **Lead Capture Modal:** A smooth, interactive form that collects user details before providing a "download link."
 * **Modern UI:** Built using Tailwind CSS with clean micro-interactions and transitions.
### Admin Panel
 * **Lead Tracking Dashboard:** View all user submissions, contact information, and business details in real time.
 * **Lead Status Manager:** Easily mark inquiries as "Replied" to keep your pipeline organized.
 * **Content Management System (CMS):** Update the landing page's main copy directly from the dashboard without touching code.
### Backend
 * **REST API:** Express-powered endpoints to handle data exchange seamlessly.
 * **CORS Enabled:** Allows cross-origin requests, giving you the flexibility to host your frontend and backend together or separately.
## 📁 Project Folder Structure
This repository uses the **Unified Structure** where the Node.js backend serves the frontend files statically:
```text
serve-sync-pos/
├── frontend/
│   ├── index.html        # Main Landing Page
│   └── admin.html   
 Admin Dashboard Panel
 │   ├── backend/
├── package.json          # Node.js dependencies and scripts
└── server.js             # Express API Server

```
## 🛠️ Local Setup Instructions
Follow these steps to run the project locally on your machine:
 1. **Clone or download** this repository into your project directory.
 2. Open your terminal in the root directory (serve-sync-pos/) and install the required packages:
   ```bash
   npm install
   
   ```
 3. Start the local server:
   ```bash
   node server.js
   
   ```
