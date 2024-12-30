const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Almacenar usuarios conectados
const users = new Map();

wss.on('connection', (ws) => {
    let userId = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        switch(data.type) {
            case 'login':
                userId = data.username;
                users.set(userId, ws);
                
                // Notificar a todos sobre el nuevo usuario
                broadcast({
                    type: 'userConnected',
                    username: userId,
                    timestamp: new Date().toISOString()
                });
                break;
                
            case 'message':
                broadcast({
                    type: 'message',
                    username: userId,
                    content: data.content,
                    timestamp: new Date().toISOString()
                });
                break;
        }
    });

    ws.on('close', () => {
        if (userId) {
            users.delete(userId);
            broadcast({
                type: 'userDisconnected',
                username: userId,
                timestamp: new Date().toISOString()
            });
        }
    });
});

function broadcast(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});