const http = require("http");
const fs = require("fs")
//.promises;
const mime = require('mime');

let book;

function getExt(filename){
  return filename.indexOf('.')!==-1 ? ('.'+filename.split('.').pop()) : "";
}

//console.log(mime.getType('json'))

const requestListener = function (req, res) {
    const filename = req.url;
    // if exist(filename) {
    //   ext = getFilnameExtension(filname)
    //   const mime = getMimeTypeFromExt(ext);
    //   res.setHeader('c-t', mime)
    //   fs.readFile().then(file => {
    //     res.send(file)
    //   })
    // }

    if(filename === '/books' ){
        if(req.method === 'GET'){
            let filePath = filename.substr(1)+'/books.json';
            let ext = getExt(filePath);
            const mimeExt = mime.getType(ext);
            res.setHeader('Content-Type', mimeExt);
            let stream = fs.createReadStream(filePath);
            stream.pipe(res);
        }
        if(req.method === "POST"){
            let book2 = '';
            req.on('data', chunk => {
                book2 += chunk.toString();
            })
            req.on('end', () => {
                book = book2;
                /*console.log('book')
                console.log(book);
                console.log(JSON.parse(book))*/
                let data = fs.readFileSync('books/books.json', 'utf8');
                //console.log(data)
                let books = JSON.parse(data);
                let bookObj = JSON.parse(book);
                books.push(bookObj);
                fs.writeFileSync('books/books.json', JSON.stringify(books, null, 2));
                //console.log(books)
                res.end('ok');
            })
        }
    }
    else if(filename.startsWith('/books/')){
        let str = filename.split('/')[2];
        console.log(str)
        var booksArr = fs.readFileSync('books/books.json', 'utf8')
        var book = JSON.parse(booksArr);
        console.log('------------------------------');
        //console.log(book[str]);
        res.end(JSON.stringify(book[Number(str)], null, 2));
    }
    else{
        res.end('Error #404');
    }
};

const server = http.createServer(requestListener);

server.listen(8000, 'localhost', () => {
    console.log(('Server is ready'));
})

