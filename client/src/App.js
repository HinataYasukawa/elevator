import React, { useState, useEffect } from 'react';

function App() {
    const [elevator, setElevator] = useState({
        currentFloor: 1,
        floors: { 4: [], 3: [], 2: [], 1: [] }
    });

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setElevator(data);
        };

        // コンポーネントアンマウント時に接続を閉じる
        return () => {
            ws.close();
        };
    }, []);

    const handleFloorButton = (floor) => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'moveToFloor', floor: floor }));
            ws.close();
        };
    };

    return (
        <div>
            <h1>Elevator Status</h1>
            <p>Current Floor: {elevator.currentFloor}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {Object.keys(elevator.floors).sort((a, b) => b - a).map(floor => (
                    <button key={floor} onClick={() => handleFloorButton(parseInt(floor))} style={{ margin: '5px' }}>
                        Floor {floor}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
