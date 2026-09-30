// Global State - holds core numerical values for the session
const gameState = {
    credits: 12500,
    currentLocation: "Luna Station Hub",
    casino: {
        currentRoll: 0,
        lastLog: "Place your bet, Operator. The house wins on exact matches."
    }
};

// Global UI engine function to sync header display variables
function updateHeaderUI() {
    // Wrapped in a try block so it won't crash the script if 'credit-count' doesn't exist yet
    try {
        const creditElement = document.getElementById('credit-count');
        if (creditElement) {
            creditElement.innerText = gameState.credits;
        }
    } catch (error) {
        console.error("UI Sync Error:", error);
    }
}

// Kick off initialization sequence when the browser tab mounts
window.onload = () => {
    const splash = document.getElementById('splash-screen');
    
    // 1. Sync the background values safely
    updateHeaderUI();
    
    // 2. Enforce the 2-second hold
    setTimeout(() => {
        console.log("2 seconds elapsed. Removing splash screen...");
        
        if (splash) {
            // Force hidden states visually and physically
            splash.classList.add('splash-hidden');
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            
            // Completely drop it out of the layout after the 0.5s CSS transition finishes
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500);
        } else {
            console.warn("Splash screen element not found in HTML!");
        }
        
        // 3. Render the core hub menus safely
        try {
            if (typeof showHubMenu === "function") {
                showHubMenu();
            } else {
                console.error("Critical: showHubMenu() function is missing or not loaded yet. Check modules.js!");
            }
        } catch (menuError) {
            console.error("Error rendering hub menu:", menuError);
        }
        
    }, 2000);
    showHubMenu();
};
