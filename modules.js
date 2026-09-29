// --- MODULE: MAIN HUB MENU ---
function showHubMenu() {
    const display = document.getElementById('main-display');
    if (!display) return;
    
    display.innerHTML = `
        <h1>Luna Station Hub</h1>
        <p style="color: #8a99a8; text-align: center;">Welcome back, Operator. Select a localized deck module.</p>
        
        <div class="options-grid">
            <button class="station-btn" onclick="alert('Entering Hangar...')">Hangar</button>
            <button class="station-btn" onclick="alert('Entering Shipyard...')">Shipyard</button>
            <button class="station-btn" onclick="alert('Opening Commodity Market...')">Market</button>
            <button class="station-btn" onclick="enterCasino()" style="color: #ff00ff; border-color: #ff00ff;">Casino</button>
            <button class="station-btn" onclick="alert('Accessing Faction Missions...')">Missions</button>
            <button class="station-btn" onclick="alert('Undocking Ship...')" style="border-color: #ff9900; color: #ff9900;">Undock Ship</button>
        </div>
    `;
    updateHeaderUI();
}

// --- MODULE: CASINO ---
function enterCasino() {
    gameState.casino.currentRoll = Math.floor(Math.random() * 6) + 1;
    renderCasinoUI();
}

function renderCasinoUI() {
    const display = document.getElementById('main-display');
    if (!display) return;

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        <div class="dice-matrix">CURRENT DIE: [ ${gameState.casino.currentRoll} ]</div>
        <p id="casino-log" style="color: #8a99a8; min-height: 40px; margin-bottom: 20px; text-align:center;">${gameState.casino.lastLog}</p>
        
        <div class="options-grid">
            <button class="station-btn" onclick="playCasinoTurn('H')" style="border-color: #4af626; color: #4af626;">HIGHER ▲</button>
            <button class="station-btn" onclick="playCasinoTurn('L')" style="border-color: #ff3333; color: #ff3333;">LOWER ▼</button>
            <button class="station-btn" onclick="showHubMenu()" style="grid-column: span 2; border-color: #8a99a8; color: #8a99a8; padding: 12px;">Return to Hub</button>
        </div>
    `;
}

function playCasinoTurn(guess) {
    let secondRoll = Math.floor(Math.random() * 6) + 1;
    let won = false;

    if (gameState.casino.currentRoll === secondRoll) {
        won = false;
    } else if (guess === 'H' && secondRoll > gameState.casino.currentRoll) {
        won = true;
    } else if (guess === 'L' && secondRoll < gameState.casino.currentRoll) {
        won = true;
    }

    if (won) {
        gameState.credits += 500;
        gameState.casino.lastLog = `<span style="color: #4af626;">SUCCESS: Next roll was [ ${secondRoll} ]. +500 Credits.</span>`;
    } else {
        gameState.credits -= 500;
        gameState.casino.lastLog = `<span style="color: #ff3333;">FAILED: Next roll was [ ${secondRoll} ]. -500 Credits.</span>`;
    }

    gameState.casino.currentRoll = Math.floor(Math.random() * 6) + 1;
    updateHeaderUI();
    renderCasinoUI();
}

// Safely initializes the hub rendering setup once the DOM tree has finished compiling
document.addEventListener("DOMContentLoaded", () => {
    showHubMenu();
});
