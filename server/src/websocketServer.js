const WebSocket = require('ws');
const Elevator = require('./gameLogic');

const wss = new WebSocket.Server({ port: 8080 });
const elevator = new Elevator();

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        if (msg.type === 'moveToFloor') {
            elevator.moveToFloor(msg.floor);
            setTimeout(() => {
                broadcastElevatorState(); // 状態が更新された後にブロードキャスト
            }, 1000 * Math.abs(msg.floor - elevator.currentFloor));
        }
    });
});

function broadcastElevatorState() {
    const state = JSON.stringify(elevator.getState());
    wss.clients.forEach(client => {
        client.send(state);
    });
}

module.exports = wss;
