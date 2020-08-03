
const directions = [[-1, 0],[0, 1],[1, 0],[0, -1]];
var visited = new Set(); 
var animations = [];

class robot {
    constructor(array) {
        this.array = array;
        this.direction = 0; //  0: 'up', 1: 'right', 2: 'down', 3: 'left'
        this.cell = [0,0];
    }

    turnRight(){
        this.direction = 1;
    }
    turnLeft(){
        this.direction = 3;
    }
    go_back(){
        this.direction = 2;
    }
    move(){
        if( this.cell[0] + directions[this.direction][0] < 0  
            || this.cell[0] + directions[this.direction][0] >= 15 
            || this.cell[1] + directions[this.direction][1] < 0 
            || this.cell[1] + directions[this.direction][1] >= 20
            || this.array[this.cell[0] + directions[this.direction][0]][this.cell[1]] === 0
            || this.array[this.cell[0]][directions[this.direction][1] + this.cell[1]] === 0 
        )
                return false;
        else{
            this.cell[0] = this.cell[0] + directions[this.direction][0];
            this.cell[1] = this.cell[1] + directions[this.direction][1];
            return true;
        }
    }
    clean(){
        this.array[this.cell[0]][this.cell[1]] = 2;
    }
}; 

export function robotclean(array) {
        var ar = [];
        
        for(var i = 0;i<15;i++){
            var c = [];
            for(var j = 0; j<20;j++){
                if(array[20*i+j] === 0)
                    c.push(0);
                else
                    c.push(1);
            }
            ar.push(c);    
        }
        let robo = new robot(ar);

        backtrack(robo);
        return animations;
    }

function apush(array){
    var c = [];
    for(var i = 0;i<15;i++){
        for(var j = 0; j<20;j++){
            c.push(array[i][j]);
        }
    }
    animations.push(c);
}

function backtrack(robo){
    console.log(robo,visited);
    apush(robo.array);
    visited.add(robo.cell);
    robo.clean();
    
    for(var i = 0;i<4;i++){

        var new_cell = [];
        var new_d = (robo.direction + i) % 4
        new_cell.push(robo.cell[0] + directions[new_d][0]); 
        new_cell.push(robo.cell[1] + directions[new_d][1]);

        if (visited.has(new_cell)==false && robo.move()){
            backtrack(robo);
            robo.go_back();
        }
       
        robo.turnRight();
    }

}