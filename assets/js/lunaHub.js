// --- SHARED HELPERS ---

// Builds the area image shown at the top of the body, under the title.
// If the image fails to load, the banner hides itself.
function areaBanner(fileName, altText) {
    return `
        <div class="area-banner">
            <img src="assets/images/${fileName}" alt="${altText}"
                 onerror="this.parentElement.style.display='none'">
        </div>
    `;
}

function setLocation(name) {
    gameState.currentLocation = name;
    updateHeaderUI();
}

// --- MODULE: MAIN HUB MENU ---
function showHubMenu() {
    const display = document.getElementById('main-display');
    if (!display) return;

    setLocation("Luna Station Hub");

    display.innerHTML = `
        <h1>Luna Station Hub</h1>
        ${areaBanner('lunaHub.jpg', 'Luna Station Hub')}
        <p class="area-text">Welcome back, Operator. Select a destination.</p>

        <div class="options-grid">
            <button class="station-btn" onclick="alert('Entering Hangar...')">Hangar</button>
            <button class="station-btn" onclick="alert('Entering Shipyard...')">Shipyard</button>
            <button class="station-btn" onclick="alert('Opening Commodity Market...')">Market</button>
            <button class="station-btn btn-cyan" onclick="enterCasino()">Casino</button>
            <button class="station-btn" onclick="alert('Accessing Faction Missions...')">Missions</button>
            <button class="station-btn btn-amber" onclick="alert('Undocking Ship...')">Undock Ship</button>
        </div>
    `;
}

// --- MODULE: CASINO ---

// 1. WELCOME SCREEN
function enterCasino() {
    gameState.casino.lastLog = '';

    const display = document.getElementById('main-display');
    if (!display) return;

    setLocation("Luna Casino Deck");

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        ${areaBanner('lunarCasino.jpg', 'Luna Casino Deck')}
        <p class="area-text">
            Welcome to the High-Low Dice Casino!<br>
            A random 6-sided die will be cast. Predict whether the next roll will be
            <strong>HIGHER</strong> or <strong>LOWER</strong> than the active one.
        </p>
        <p class="area-text rules">
            Correct guess: <strong>+500</strong> Credits &nbsp;|&nbsp;
            Wrong guess: <strong>-500</strong> Credits &nbsp;|&nbsp;
            Tie (push): <strong>-250</strong> Credits
        </p>

        <div class="options-grid">
            <button class="station-btn btn-green" onclick="startCasinoGame()">Play Game</button>
            <button class="station-btn btn-muted" onclick="showHubMenu()">Return to Hub</button>
        </div>
    `;
}

// Transition from Welcome to Game loop
function startCasinoGame() {
    gameState.casino.currentRoll = Math.floor(Math.random() * 6) + 1;
    renderCasinoUI();
}

// 2. CORE GAME SCREEN (Choosing Higher or Lower)
function renderCasinoUI() {
    const display = document.getElementById('main-display');
    if (!display) return;

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        ${areaBanner('lunarCasino.jpg', 'Luna Casino Deck')}

        <div class="dice-matrix">
            <span class="dice-label">Current Die</span>
            <span class="dice-face">${gameState.casino.currentRoll}</span>
        </div>

        <div class="options-grid">
            <button class="station-btn btn-green" onclick="playCasinoTurn('H')">Higher ▲</button>
            <button class="station-btn btn-red" onclick="playCasinoTurn('L')">Lower ▼</button>
        </div>
    `;
}

// Core Logic Execution
function playCasinoTurn(guess) {
    const secondRoll = Math.floor(Math.random() * 6) + 1;
    const currentRoll = gameState.casino.currentRoll;
    let outcomeHtml = '';

    if (currentRoll === secondRoll) {
        gameState.credits -= 250;
        outcomeHtml = `<span class="result-push">PUSH: Next roll was also [ ${secondRoll} ]. -250 Credits.</span>`;
    }
    else if ((guess === 'H' && secondRoll > currentRoll) || (guess === 'L' && secondRoll < currentRoll)) {
        gameState.credits += 500;
        outcomeHtml = `<span class="result-win">SUCCESS: Next roll was [ ${secondRoll} ]. +500 Credits.</span>`;
    }
    else {
        gameState.credits -= 500;
        outcomeHtml = `<span class="result-loss">FAILED: Next roll was [ ${secondRoll} ]. -500 Credits.</span>`;
    }

    updateHeaderUI();
    renderCasinoResult(currentRoll, secondRoll, outcomeHtml);
}

// 3. RESULT SCREEN
function renderCasinoResult(oldRoll, newRoll, outcomeText) {
    const display = document.getElementById('main-display');
    if (!display) return;

    // The new roll becomes the starting point if they play again
    gameState.casino.currentRoll = newRoll;

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        ${areaBanner('lunarCasino.jpg', 'Luna Casino Deck')}

        <div class="result-panel">
            <p class="area-text">You started with: <strong>[ ${oldRoll} ]</strong></p>
            <p class="result-line">${outcomeText}</p>
        </div>

        <div class="options-grid">
            <button class="station-btn btn-green" onclick="renderCasinoUI()">Play Again</button>
            <button class="station-btn btn-muted" onclick="showHubMenu()">Quit to Hub</button>
        </div>
    `;
}
