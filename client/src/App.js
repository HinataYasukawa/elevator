import React, { useState, useEffect } from 'react';

function App() {
    const [elevator, setElevator] = useState({ currentFloor: 1, people: 0 });

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setElevator(data);
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            <h1>Elevator Status</h1>
            <p>Current Floor: {elevator.currentFloor}</p>
            <p>People in Elevator: {elevator.people}</p>
        </div>
    );
}

export default App;
