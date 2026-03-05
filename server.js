const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './' || filePath === './sender') filePath = './sender.html';
    else if (filePath.startsWith('./display')) filePath = './display.html';
    else if (filePath.startsWith('./manual')) filePath = './manual_zh_tw.html';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const wss = new WebSocket.Server({ server });

let clients = new Map();

wss.on('connection', (ws) => {
    const clientId = Math.random().toString(36).substr(2, 9);
    
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());

        if (data.type === 'register') {
            clients.set(clientId, { ws, info: data.info, role: 'display' });
            broadcastClientList();
        } else if (data.type === 'control') {
            if (data.targetId === 'all') {
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data.payload));
                    }
                });
            } else {
                const target = clients.get(data.targetId);
                if (target && target.ws.readyState === WebSocket.OPEN) {
                    target.ws.send(JSON.stringify(data.payload));
                }
            }
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        broadcastClientList();
    });
});

function broadcastClientList() {
    const list = Array.from(clients.entries()).map(([id, client]) => ({
        id,
        info: client.info
    }));
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'clientList', list }));
        }
    });
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
