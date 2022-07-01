import React, {useEffect, useRef, useState} from "react";

const field = [
	['','A','Б','В','Г','Д','Е','Ё','Ж','З','И'],
	['1', 0,0,0,0,0,0,0,0,0,0 ],
	['2', 0,0,0,0,0,0,0,0,0,0 ],
	['3', 0,0,0,0,0,0,0,0,0,0 ],
	['4', 0,0,0,0,0,0,0,0,0,0 ],
	['5', 0,0,0,0,0,0,0,0,0,0 ],
	['6', 0,0,0,0,0,0,0,0,0,0 ],
	['7', 0,0,0,0,0,0,0,0,0,0 ],
	['8', 0,0,0,0,0,0,0,0,0,0 ],
	['9', 0,0,0,0,0,0,0,0,0,0 ],
	['10',0,0,0,0,0,0,0,0,0,0 ]
];




const Table = () => {
	return (
		<table className='table'>
			<tbody>
				{
					field.map(item => (
						<tr className='item'>{
								item.map(item2 => (
									item2 === 0 ? <td className='item2' >
									{''}</td> : <td className='item3' >
									{item2}</td>
								))
							}
						</tr>
					))
				}
			</tbody>
		</table> 
	)
}


const Ships = () => {

}

const SeaBattle = () => {
	return (
		<div>
			<Table />
			
		</div>
		
	)
export default SeaBattle;