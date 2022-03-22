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
	cikle: async function(req, method){
		let books = await this.openFile();
		let objBody = {
			id: req.id,
			title: req.title,
			author: req.author,
			year: req.year
		}
		let newBook;
		for(let i=0; i<books.length; i++){
			if(books[i].id == objBody.id){
				newBook = books[i];
				break;
			}
		}
		if(method === 'POST'){
			if(!newBook){
				books.push(objBody);
				let newBooks = this.sortAble(books);       
				this.writeFile(books); 
				return JSON.stringify(objBody, null, 2);                    
			}else{
				return '<h1 style="text-align:center">The book exists !</h1>';
			}
		}
		if(method === 'PUT'){
			if(newBook){
				newBook.title = req.title;
				newBook.author = req.author;
				newBook.year = req.year;
				this.writeFile(books);
				return newBook;
			}else{
				return '<h1 style="text-align:center">The book is not existed !</h1>';
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
		if(index > -1){
			let book = books.splice(index,1);
			console.log('book', book);
			this.writeFile(books);					
			return 'the book is deleted';
		}else{
			return'<h1 style="text-align:center">The book does not existed !</h1>';
		}
	}
}


