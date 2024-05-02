class Elevator {
    constructor() {
        this.currentFloor = 1;
        this.people = 0;
    }

    moveToFloor(floor) {
        this.currentFloor = floor;
    }

    loadPeople(count) {
        this.people += count;
    }

    unloadPeople() {
        this.people = 0;
    }

    getState() {
        return {
            currentFloor: this.currentFloor,
            people: this.people
        };
    }
}

module.exports = Elevator;
