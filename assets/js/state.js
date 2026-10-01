// Global State - holds core metrics
const gameState = {
    credits: 12500,
    currentLocation: "Luna Station Hub",
    casino: {
        currentRoll: 0,
        lastLog: "Place your bet, Operator. The house wins on exact matches."
    }
};

// Global UI engine function to sync header data points
function updateHeaderUI() {
    const creditEl = document.getElementById('credit-count');
    if (creditEl) {
        creditEl.innerText = gameState.credits;
    }
}

// Kick off initialization sequence when the browser tab mounts
window.onload = () => {
    const splash = document.getElementById('splash-screen');
    
    // 1. Instantly display standard UI values in the background
    updateHeaderUI();
    
    // 2. Hold the splash screen
    setTimeout(() => {
        if (splash) {
            splash.classList.add('splash-hidden');
        }
        
        // 3. Render the hub menus smoothly after the screen fades
        showHubMenu();
    }, 3000);
};
