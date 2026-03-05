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

wss.on('connection', (ws, req) => {
    const clientId = Math.random().toString(36).substr(2, 9);
    
    // Capture IP Address (handling proxy headers if present)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const cleanIp = ip.replace('::ffff:', ''); // Clean IPv6 prefix for local IPv4

    setTimeout(() => {
        sendClientListTo(ws);
    }, 100);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());

            if (data.type === 'register') {
                // Add IP to the client info
                const clientInfo = { ...data.info, ip: cleanIp };
                clients.set(clientId, { ws, info: clientInfo, role: 'display' });
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
        } catch (e) {
            console.error("Error processing message:", e);
        }
    });

    ws.on('close', () => {
        if (clients.has(clientId)) {
            clients.delete(clientId);
            broadcastClientList();
        }
    });
});

function sendClientListTo(ws) {
    if (ws.readyState === WebSocket.OPEN) {
        const list = Array.from(clients.entries()).map(([id, client]) => ({
            id,
            info: client.info
        }));
        ws.send(JSON.stringify({ type: 'clientList', list }));
    }
}

function broadcastClientList() {
    const list = Array.from(clients.entries()).map(([id, client]) => ({
        id,
        info: client.info
    }));
    
    const message = JSON.stringify({ type: 'clientList', list });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
