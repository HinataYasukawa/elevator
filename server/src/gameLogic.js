class Elevator {
    constructor() {
        this.currentFloor = 1;
        this.floors = {1: [], 2: [], 3: [], 4: []};
    }

    moveToFloor(targetFloor) {
        const step = () => {
            if (this.currentFloor < targetFloor) {
                this.currentFloor++;
            } else if (this.currentFloor > targetFloor) {
                this.currentFloor--;
            }
    
            if (this.currentFloor !== targetFloor) {
                setTimeout(step, 1000); // 1秒ごとに次の階へ移動
            } else {
                console.log("Arrived at floor " + this.currentFloor);
            }
        };
    
        step();
    }

    getState() {
        return {
            currentFloor: this.currentFloor,
            floors: this.floors
        };
    }
}

module.exports = Elevator;
