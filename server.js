
// Serve Sync POS - Live Unified Backend (Node.js + Express)
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- Memory Database ---
let landingPageConfig = {
    heroTitle: "The POS system your<br/><em>business deserves</em>",
    heroSub: "Serve Sync brings lightning-fast billing, smart inventory, and real-time reporting to restaurants, cafes, and retail shops — all in one elegant app."
};

let leads = [
    {
        id: "1",
        name: "Arjun Mehta",
        business: "Spice Route Cafe",
        email: "arjun.mehta@example.com",
        phone: "+91 98765 43210",
        date: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        status: "pending",
        replyMessage: ""
    },
    {
        id: "2",
        name: "Priya Patel",
        business: "Café Bloom",
        email: "priya@cafebloom.com",
        phone: "+91 99123 45678",
        date: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        status: "replied",
        replyMessage: "Sent installation link and onboarding brochure via WhatsApp."
    }
];

// --- API Endpoints ---

// GET: Landing page configuration
app.get('/api/config', (req, res) => {
    res.json(landingPageConfig);
});

// POST: Update landing page configuration (CMS)
app.post('/api/config', (req, res) => {
    const { heroTitle, heroSub } = req.body;
    if (heroTitle) landingPageConfig.heroTitle = heroTitle;
    if (heroSub) landingPageConfig.heroSub = heroSub;
    res.json({ message: "Content updated successfully!", config: landingPageConfig });
});

// GET: All leads
app.get('/api/leads', (req, res) => {
    // Return newest first
    const sortedLeads = [...leads].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sortedLeads);
});

// POST: Save a new lead (Download submission)
app.post('/api/leads', (req, res) => {
    const { name, business, email, phone } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required." });
    }

    const newLead = {
        id: Date.now().toString(),
        name,
        business: business || "N/A",
        email,
        phone: phone || "N/A",
        date: new Date().toISOString(),
        status: "pending",
        replyMessage: ""
    };

    leads.push(newLead);
    res.status(201).json({ message: "Lead recorded successfully!", lead: newLead });
});

// PUT: Send a reply / Mark lead as Replied
app.put('/api/leads/:id/reply', (req, res) => {
    const { id } = req.params;
    const { replyMessage } = req.body;
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
        return res.status(404).json({ error: "Lead not found." });
    }

    leads[leadIndex].status = "replied";
    leads[leadIndex].replyMessage = replyMessage || "Replied successfully";
    res.json({ message: "Reply updated successfully!", lead: leads[leadIndex] });
});

// DELETE: Remove a lead (Optional Admin convenience)
app.delete('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    leads = leads.filter(l => l.id !== id);
    res.json({ message: "Lead removed successfully." });
});

// Catch-all to serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Serve Sync POS Server Live at http://localhost:${PORT}`);
    console.log(`📝 Admin panel is live at http://localhost:${PORT}/admin.html`);
    console.log(`=================================================`);
});
