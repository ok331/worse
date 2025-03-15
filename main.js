// Profile data structure
let profiles = [];

// Function to add a new profile
function addProfile(username, title, description) {
    // Check if profile already exists
    const exists = profiles.some(p => p.username === username);
    if (!exists) {
        profiles.push({
            username,
            title,
            description
        });
        renderProfiles();
        saveProfiles();
    }
}

// Function to render profiles in the grid
function renderProfiles() {
    const profilesGrid = document.getElementById('profilesGrid');
    if (!profilesGrid) return;

    profilesGrid.innerHTML = '';
    
    // Sort profiles to ensure specific order: x, zone, r
    const sortedProfiles = profiles.sort((a, b) => {
        const order = { 'x': 0, 'zone': 1, 'r': 2 };
        return order[a.username] - order[b.username];
    });
    
    sortedProfiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
            <h3>${profile.title}</h3>
            <p>${profile.description}</p>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `/${profile.username}`;
        });
        
        profilesGrid.appendChild(card);
    });
}

// Save profiles to localStorage
function saveProfiles() {
    try {
        localStorage.setItem('profiles', JSON.stringify(profiles));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

// Load profiles from localStorage
function loadProfiles() {
    // Clear existing localStorage to ensure fresh data
    localStorage.removeItem('profiles');
    
    try {
        const savedProfiles = localStorage.getItem('profiles');
        if (savedProfiles) {
            profiles = JSON.parse(savedProfiles);
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
    
    // Always ensure default profiles exist with correct titles
    profiles = []; // Clear any existing profiles
    addProfile('x', 'x\'s profile', 'click to view');
    addProfile('zone', 'zone\'s profile', 'click to view');
    addProfile('r', 'r\'s profile', 'click to view');
    
    renderProfiles();
}

// Discord copy functionality
document.addEventListener('DOMContentLoaded', () => {
    loadProfiles();

    const discordButton = document.getElementById('discordCopy');
    const notification = document.getElementById('copyNotification');
    let notificationTimeout;

    if (discordButton) {
        discordButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('niukio').then(() => {
                // Show notification
                notification.classList.add('show');
                
                // Clear existing timeout if any
                if (notificationTimeout) {
                    clearTimeout(notificationTimeout);
                }
                
                // Hide notification after 2 seconds
                notificationTimeout = setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            });
        });
    }
}); 