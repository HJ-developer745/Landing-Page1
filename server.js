
// Serve Sync POS - Backend Server (Node.js + Express)
// To run: 
// 1. npm init -y
// 2. npm install express cors
// 3. node server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON body

// --- In-Memory Database Simulation ---
// In a real production app, you would use MongoDB, PostgreSQL, or Firebase here.

// 1. Landing Page Dynamic Content Configuration
let landingPageConfig = {
    heroTitle: "Next-Gen POS for Modern Businesses",
    heroSubtitle: "Serve Sync POS streamlines your operations, speeds up checkout, and syncs your team seamlessly. Built for restaurants, retail, and more.",
    features: ["Cloud Syncing", "Real-time Analytics", "Inventory Management"]
};

// 2. Leads Database
let leads = [
    {
        id: "1",
        name: "John Doe",
        email: "john@examplecafe.com",
        business: "Example Cafe",
        phone: "+1 234 567 890",
        date: new Date().toISOString(),
        status: "pending" // pending or replied
    }
];

// --- API Endpoints ---

// GET: Fetch Landing Page Configuration (Used by Landing Page)
app.get('/api/config', (req, res) => {
    res.json(landingPageConfig);
});

// POST: Update Landing Page Configuration (Used by Admin Panel)
app.post('/api/config', (req, res) => {
    const { heroTitle, heroSubtitle } = req.body;
    if (heroTitle) landingPageConfig.heroTitle = heroTitle;
    if (heroSubtitle) landingPageConfig.heroSubtitle = heroSubtitle;
    res.json({ message: "Configuration updated successfully", config: landingPageConfig });
});

// POST: Submit a new Lead / Download Request (Used by Landing Page)
app.post('/api/leads', (req, res) => {
    const { name, email, business, phone } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required." });
    }

    const newLead = {
        id: Date.now().toString(),
        name,
        email,
        business: business || 'N/A',
        phone: phone || 'N/A',
        date: new Date().toISOString(),
        status: "pending"
    };

    leads.push(newLead);
    res.status(201).json({ message: "Details submitted successfully! Download link sent.", lead: newLead });
});

// GET: Fetch all Leads (Used by Admin Panel)
app.get('/api/leads', (req, res) => {
    // Sort by newest first
    const sortedLeads = [...leads].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sortedLeads);
});

// PUT: Update Lead Status (e.g., mark as Replied) (Used by Admin Panel)
app.put('/api/leads/:id/reply', (req, res) => {
    const leadId = req.params.id;
    const leadIndex = leads.findIndex(l => l.id === leadId);
    
    if (leadIndex === -1) {
        return res.status(404).json({ error: "Lead not found" });
    }

    leads[leadIndex].status = "replied";
    res.json({ message: "Lead marked as replied", lead: leads[leadIndex] });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Serve Sync POS Backend running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/...`);
});
