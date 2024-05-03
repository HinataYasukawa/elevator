class Elavator{
    constructor(){
        this.currentFloor = 1;
        this.floors = {1:[], 2:[], 3:[], 4:[]};
    }

    moveToFloor(targetFloor){
        while(currentFloor != targetFloor){
            if(this.currentFloor < targetFloor){
                targetFloor++;
            }else if(this.currentFloor > targetFloor){
                targetFloor--;
            }
        }
        console.log("arrived");
    }

    getState(){
        return{
            currentFloor:this.currentFloor,
            floors:this.floors
        }
    }
}
module.exports = Elevator;