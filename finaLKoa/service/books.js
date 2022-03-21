const fs = require('fs');

module.exports = {
	openFile: function(){
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
	},
	writeFile: function(books){
		let writeableStream = fs.createWriteStream('books/books.json');
		writeableStream.write(JSON.stringify(books, null, 2));
		writeableStream.end();
		writeableStream.on('finish', () =>
		  	console.log('Data was written.')
		)
	},
	sortAble: function(arr){
		return arr.sort((a, b) => a.id > b.id ? 1 : -1);
	}
}


