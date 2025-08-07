function addGame() {
    // ...existing code...
    const gameElement = document.createElement('div');
    gameElement.className = 'game-card';
    
    gameElement.innerHTML = `
        <h3>${gameTitle}</h3>
        <p>Platinum Date: ${platinumDate}</p>
        <button onclick="deleteGame(this)">Delete</button>
    `;
    // ...existing code...
}
// ...existing code...