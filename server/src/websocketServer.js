const WebSocket = require('ws');
const Elevator = require('./gameLogic');

const wss = new WebSocket.Server({ port: 8080 });
const elevator = new Elevator();

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);

        switch (msg.type) {
            case 'moveToFloor':
                elevator.moveToFloor(msg.floor);
                break;
            case 'loadPeople':
                elevator.loadPeople(msg.count);
                break;
            case 'unloadPeople':
                elevator.unloadPeople();
                break;
        }

        broadcastElevatorState();
    });
});

function broadcastElevatorState() {
    const state = JSON.stringify(elevator.getState());
    wss.clients.forEach(client => {
        client.send(state);
    });
}

module.exports = wss;
