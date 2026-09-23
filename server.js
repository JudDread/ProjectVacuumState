const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
cors: { origin: "*" }
});
const path = require('path');
// Serve the frontend files
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});
// Real-time communication network logic
io.on('connection', (socket) => {
console.log('A player connected:', socket.id);
// Listen for custom game events from the player's browser
socket.on('playerMove', (data) => {
// Broadcast the move data to every other connected player instantly
socket.broadcast.emit('enemyMoved', { id: socket.id, position: data });
});
socket.on('disconnect', () => {
console.log('Player disconnected:', socket.id);
});
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
console.log(Game server running perfectly on port ${PORT});
});