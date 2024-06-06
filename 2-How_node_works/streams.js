const fs = require('fs')
const server = require('http').createServer()

server.on('request',(req,res)=>{
    //solution 1
   /* fs.readFile("test-file.txt", (err,data)=>{
        if(err) console.log(err)
        res.end(data)
    }) */

    //solution 2 we can use streams

  /*  const readable = fs.createReadStream("testt-file.txt");
    //each time we get data, readable stream emits data event in callback we have access to that data (chunk)
    readable.on('data',(chunk)=>{
        res.write(chunk);   //res is writablestream and we can write data using write method in that stream
    })

    //We have to handle that once the finished with reading the file
    //In that case end event will be emmmited

    readable.on('end',()=>{
        res.end(); // no more data is available to write in writeable strteam
    })

    readable.on('error', err=>{
        console.log(err);
        res.statusCode = 500;
        res.end("File Not found");
    }) */

    //solution 3 
    //The problem with this is readale stream we use to read the file from the disk is much much faster than 
    //than actually sending the result with the response writable stream 
    //This will overwhelm response (this problem is called backpressure)

    //we have to use pipe operator , it is available on all readable streams it allows to write the output of
    //readable streams into input of writable streams 

    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res); //putting writable stream into  readable stream  

})

server.listen(8000,"localHost",()=>{
    console.log("Server is running on 8000❤️");
})