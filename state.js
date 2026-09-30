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
    document.getElementById('credit-count').innerText = gameState.credits;
}

// Kick off initialization sequence when the browser tab mounts
window.onload = () => {
    const splash = document.getElementById('splash-screen');
    
    // 1. Instantly display standard UI values in the background
    updateHeaderUI();
    
    // 2. Hold the splash screen for exactly 2 seconds (2000ms)
    setTimeout(() => {
        if (splash) {
            splash.classList.add('splash-hidden');
        }
        
        // 3. Render the hub menus smoothly after the screen fades
        showHubMenu();
    }, 2000);
};
