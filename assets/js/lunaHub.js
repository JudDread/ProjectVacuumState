// --- MODULE: MAIN HUB MENU ---
//this sets the background image for the headers
function setHeaderBg(file) {
    const header = document.getElementById('game-header');
    if (header) {
        const url = new URL(`assets/images/${file}`, document.baseURI).href;
        header.style.setProperty('--header-bg', `url('${url}')`);
    }
}
function showHubMenu() {
    
    // Set the background image to the lunaHub file
    const header = document.getElementById('game-header');
    if (header) {
        setHeaderBg('lunaHub.jpg');
    }

    const display = document.getElementById('main-display');
    if (!display) return;
    
    display.innerHTML = `
        <h1>Luna Station Hub</h1>
        <p style="color: #8a99a8; text-align: center;">Welcome back, Operator. Select a destination.</p>
        
        <div class="options-grid">
            <button class="station-btn" onclick="alert('Entering Hangar...')">Hangar</button>
            <button class="station-btn" onclick="alert('Entering Shipyard...')">Shipyard</button>
            <button class="station-btn" onclick="alert('Opening Commodity Market...')">Market</button>
            <button class="station-btn" onclick="enterCasino()" style="color: #00ffff; border-color: #00ffff;">Casino</button>
            <button class="station-btn" onclick="alert('Accessing Faction Missions...')">Missions</button>
            <button class="station-btn" onclick="alert('Undocking Ship...')" style="border-color: #ff9900; color: #ff9900;">Undock Ship</button>
        </div>
    `;
    updateHeaderUI();
}

// --- MODULE: CASINO ---

function enterCasino() {
    gameState.casino.lastLog = ''; 
    
    // Set the background image to the casino file
    const header = document.getElementById('game-header');
    if (header) {
        setHeaderBg('lunarCasino.jpg');
}

// 1. WELCOME SCREEN
    
    const display = document.getElementById('main-display');
    if (!display) return;

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        <p style="color: #8a99a8; text-align: center; margin-bottom: 30px; line-height: 1.6;">
            Welcome to the High-Low Dice Casino!<br>
            A random 6-sided die will be cast. Your goal is simple: predict whether the next consecutive roll will be <strong>HIGHER</strong> or <strong>LOWER</strong> than the active one. <br><br>
            Wrong guesses cost <strong>500 Credits</strong> and each correct guess awards <strong>500 Credits</strong>. Ties result in a push (-250 credits).
        </p>
        
        <div class="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <button class="station-btn" onclick="startCasinoGame()" style="border-color: #4af626; color: #4af626; padding: 12px;">Play Game</button>
            <button class="station-btn" onclick="showHubMenu()" style="border-color: #8a99a8; color: #8a99a8; padding: 12px;">Return to Hub</button>
        </div>
    `;
}

// Helper to transition from Welcome to Game loop
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
        <div class="dice-matrix" style="text-align: center; font-size: 1.5rem; margin-bottom: 30px;">
            CURRENT DIE: [ ${gameState.casino.currentRoll} ]
        </div>
        
        <div class="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <button class="station-btn" onclick="playCasinoTurn('H')" style="border-color: #4af626; color: #4af626; padding: 12px;">HIGHER ▲</button>
            <button class="station-btn" onclick="playCasinoTurn('L')" style="border-color: #ff3333; color: #ff3333; padding: 12px;">LOWER ▼</button>
        </div>
    `;
}

// Core Logic Execution
function playCasinoTurn(guess) {
    let secondRoll = Math.floor(Math.random() * 6) + 1;
    let currentRoll = gameState.casino.currentRoll;
    let outcomeHtml = '';

    // Determine results
    if (currentRoll === secondRoll) {
        gameState.credits -= 250;
        outcomeHtml = `<span style="color: #ffcc00;">PUSH: Next roll was also [ ${secondRoll} ]. -250 Credits.</span>`;
    } 
    else if ((guess === 'H' && secondRoll > currentRoll) || (guess === 'L' && secondRoll < currentRoll)) {
        gameState.credits += 500;
        outcomeHtml = `<span style="color: #4af626;">SUCCESS: Next roll was [ ${secondRoll} ]. +500 Credits.</span>`;
    } 
    else {
        gameState.credits -= 500;
        outcomeHtml = `<span style="color: #ff3333;">FAILED: Next roll was [ ${secondRoll} ]. -500 Credits.</span>`;
    }

    // Update Header UI for credit tracking changes
    updateHeaderUI();
    
    // Pass execution directly to the result screen
    renderCasinoResult(currentRoll, secondRoll, outcomeHtml);
}

// 3. RESULT SCREEN (Showing results and next-step actions)
function renderCasinoResult(oldRoll, newRoll, outcomeText) {
    const display = document.getElementById('main-display');
    if (!display) return;

    // Set the old second roll as the new starting point if they play again
    gameState.casino.currentRoll = newRoll;

    display.innerHTML = `
        <h1>Luna Casino Deck</h1>
        <div style="text-align: center; margin-bottom: 25px; line-height: 1.8;">
            <p style="color: #8a99a8;">You started with: <strong>[ ${oldRoll} ]</strong></p>
            <p style="font-size: 1.3rem; font-weight: bold; margin: 15px 0;">Result: ${outcomeText}</p>
        </div>
        
        <div class="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
            <button class="station-btn" onclick="renderCasinoUI()" style="border-color: #4af626; color: #4af626; padding: 12px;">Play Again</button>
            <button class="station-btn" onclick="showHubMenu()" style="border-color: #8a99a8; color: #8a99a8; padding: 12px;">Quit to Hub</button>
        </div>
    `;
}
