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
