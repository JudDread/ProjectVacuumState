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
        creditEl.innerText = gameState.credits.toLocaleString();
    }

    const locationEl = document.getElementById('location-name');
    if (locationEl) {
        locationEl.innerText = gameState.currentLocation;
    }
}

// Kick off initialization sequence when the browser tab mounts
window.onload = () => {
    const splash = document.getElementById('splash-screen');

    // 1. Display standard UI values in the background
    updateHeaderUI();

    // 2. Hold the splash screen
    setTimeout(() => {
        if (splash) {
            splash.classList.add('splash-hidden');
        }

        // 3. Render the hub menu after the splash fades
        showHubMenu();
    }, 3000);
};
