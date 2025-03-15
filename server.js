const express = require('express');
const path = require('path');
const app = express();

// Serve static files except HTML files
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        // Set proper MIME types
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        
        // Disable caching for development
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    },
    index: false // Disable serving index.html automatically
}));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for x's profile
app.get('/x', (req, res) => {
    res.sendFile(path.join(__dirname, 'x.html'));
});

// Route for zone's profile
app.get('/zone', (req, res) => {
    res.sendFile(path.join(__dirname, 'zone.html'));
});

// Route for r's profile
app.get('/r', (req, res) => {
    res.sendFile(path.join(__dirname, 'r.html'));
});

// Handle 404 errors - this should be last
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 