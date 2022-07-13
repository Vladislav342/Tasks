import React, {useState, useEffect} from 'react';
import './App.css';

const Draw = ({arr}) => {
	useEffect(()=>{
		console.log('arr')
		console.log(arr);
	}, [])

	function dragOverHandler(e){
      e.preventDefault();
      if(e.target.className === 'td'){
        e.target.style.backgroundColor = 'red';
      }
  	}

  	function dragLeaveHandler(e){
      e.target.style.backgroundColor = 'white';
  	}

  	function dropCardHandler(e, obj){
    	
  	}

    return(
    	<tbody>
    		{arr.map(arr2 => 
					<tr className='tr'>
	    				{arr2.map(obj => 
	    					<td 
	    						onDragLeave={(e) => dragLeaveHandler(e)}
	    						onDragOver={(e) => dragOverHandler(e)}
	    						onDrop={(e) => dropCardHandler(e,obj)}
	    						className='td' 
	    						key={obj.id}
	    					>
	    						{obj.x}:{obj.y}
	    					</td>
	    				)}
	    			</tr>
    			
    		)}
	   	</tbody>
    )
}

const Ships = (arr) => {
	const ships = [
		{idShip:1, type:'Ship1', field:1},
		{idShip:2, type:'Ship1', field:1},
		{idShip:3, type:'Ship1', field:1},
		{idShip:4, type:'Ship1', field:1},
		{idShip:5, type:'Ship2', field:2},
		{idShip:6, type:'Ship2', field:2},
		{idShip:7, type:'Ship2', field:2},
		{idShip:8, type:'Ship3', field:3},
		{idShip:9, type:'Ship3', field:3},
		{idShip:10,type:'Ship4', field:4},
	];

	function dragStartHandler(e, ship){
      console.log(ship);
  	}

  	function dragEndHandler(e){
      e.target.style.boxShadow = 'none';
  	}

  	function dragLeaveHandler(e){
      e.target.style.boxShadow = 'none';
  	}


	return(
		<div className='ships'>
			<p className='p'>Ships: drag and drop</p>
			<div className='ships2'>
				{ships.map(ship => 
					<p
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragEnd={(e) => dragEndHandler(e)}
						onDragStart={(e) => dragStartHandler(e, ship)}
						draggable={true}
						key={ship.id}
					 	className={ship.type}
					>
						
					</p>
				)}
			</div>
		</div>
	)
}


function App() {
	const squares = [];

	for (let x = 0; x < 10; x += 1) {
		var id = 0;
		let arr = [];
		squares.push(arr)
		for(let y = 0; y < 10; y++){
			let obj = {id:id, x:x, y:y, val:0};
			arr.push(obj);
		}
		id = id + 10;
  	}

  	useEffect(()=>{
  		console.log(squares);
  	}, [])

  return (
    <div className="app">
      	<table className='table'>
      		<Draw arr={squares} />
      	</table>
      	<Ships arr={squares} />
    </div>
  );
}

export default App;
