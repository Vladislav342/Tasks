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
	},
	cikle: function(arr, req, method){
		let objBody = {
			id: req.id,
			title: req.title,
			author: req.author,
			year: req.year
		}
		let newBook;
		for(let i=0; i<arr.length; i++){
			if(arr[i].id == objBody.id){
				newBook = arr[i];
				break
			}
		}
		if(method === 'POST'){
			if(!newBook){
				return objBody;
			}else{
				return undefined;
			}
		}
		if(method === 'PUT'){
			if(newBook){
				return newBook;
			}else{
				return undefined;
			}
		}
	},
	cikle2: function(books, id){
		console.log(id)
		let index = -1;
		for(let i=0;i<books.length;i++){
			if(books[i].id === id){
				index = i;
			}
		}
		return index;
	}
}


