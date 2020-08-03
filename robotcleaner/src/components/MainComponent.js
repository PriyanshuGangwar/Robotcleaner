import React , {Component} from 'react';
import { Navbar, NavbarBrand,Button} from 'reactstrap';
import {robotclean} from './robot';

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            array : [],
            rtop : 5,
            rleft : 5
        };
    }

    componentDidMount() {
        this.reset_array();
    }

    start(){
        const animations = robotclean(this.state.array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            
            for (let j = 0; j < animations[i].length; j++) {
                const arrayBars = document.getElementsByClassName('bar');
                const robo = document.getElementsByClassName('robot');
                
                const barOneIdx = j; 
                const robostyle = robo[0].style;
                const barOneStyle = arrayBars[barOneIdx].style;
                const newleft = ((j%20) * 40) + 5;
                const newtop = ((j%15) * 40) + 5;
                setTimeout(() => {
                    var color = "blue";
                    if(animations[i][j] === 2)
                        color = "green";
                    else if(animations[i][j] === 1)
                        color =  "rgb(106, 98, 145)";
                    else
                        color  = "black";  
                    robostyle.top = `${newtop}px`;
                    robostyle.left = `${newleft}px`;
                    barOneStyle.backgroundColor = color;
                    },i*100);
                    
                    
               }
            }
        }
    

    reset_array() {
        const row = [];
        for(var i = 0;i<300;i++){
            row.push(getRandom(0,10));
        }
        
        this.setState({array: row});
        this.setState({rtop: 5});
        this.setState({rleft: 5});

    }
    render(){
        const {array} = this.state;
        const {rtop} = this.state;
        const {rleft} = this.state;
        return(
            
            <div className = "d-flex">
                <div className ="bg-light border-right" id = "sidebar-wrapper">
                    <div class="sidebar-heading">Robot Cleaner</div>
                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
                        <a role = "button" onClick = {() => this.start()}  class="list-group-item list-group-item-action bg-light">Start</a>
                        <a role = "button" onClick = {() => this.reset_array()}   class="list-group-item list-group-item-action bg-light">Reset</a>
                    </div>
                </div>
                <div className = "bar-container">
                    {array.map((value,index) => {
                        return(
                            <div className = "bar" key = {index} style = {{backgroundColor: value == 0 ? 'black' : 'rgb(106, 98, 145)' }}></div>
                        );
                    })}
                    <div className = "robot" style = {{ top:`${rtop}px`, left: `${rleft}px` }}></div>
                </div>
                
                        
            </div>
        )
    }
}

export default Main;