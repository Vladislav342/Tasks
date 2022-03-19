const fs = require('fs');

exports.openFile = () =>{
	return new Promise((resolve,reject)=>{
	    let stream = fs.createReadStream('./books/books.json')
	    let data = "";
	    stream.on("error", err => reject(err))
	    stream.on("data", chunk => data+=chunk)
	    stream.on("end", () => {
	    	let arr = JSON.parse(data);
	    	resolve(arr)
	    })
	})
};
