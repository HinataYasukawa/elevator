const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

// 簡易的なエレベーターの状態
let elevator = {
    currentFloor: 1,
    people: 0
};

wss.on('connection', function connection(ws) {
    clients.push(ws);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        let msg = JSON.parse(message);

        switch (msg.type) {
            case 'moveToFloor':
                elevator.currentFloor = msg.floor;
                break;
            case 'loadPeople':
                elevator.people += msg.count;
                break;
            case 'unloadPeople':
                elevator.people = 0;
                break;
            default:
                console.log('Unknown message type');
        }

        broadcastElevatorState();
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

function broadcastElevatorState() {
    const state = JSON.stringify(elevator);
    clients.forEach(client => {
        client.send(state);
    });
}
