const EventEmmiter = require('events')
const http = require('http')


//instead of doing const myEmmiter = new EventEmmiter() this we can create our own class and extend 
//it by EventEmmiter

// const myEmmiter = new EventEmmiter()

// all the core modules can implement events in same way

class Sales extends EventEmmiter
{
    constructor()
    {
        super();
    }
}

const myEmmiter = new Sales()



myEmmiter.on('newSale', ()=>{
    console.log("There was a new sale🥳");
})

myEmmiter.on('newSale', ()=>{
    console.log("Customer name is Omkar🥳");
})



myEmmiter.on('newSale', stock=>{
    console.log(`The current stock available of these customer is ${stock}`);
})


myEmmiter.emit("newSale",10)


////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req,res) =>{
    console.log('Request recieved');
    console.log(req.url);
    res.end("Request recieved")
})


server.on('request', (req,res) =>{
    console.log('Another Request');
    
})


server.on('close', (req,res) =>{
    console.log('Server closed');  
})

server.listen(8000,'localHost', ()=>{
    console.log("Waiting for requests");
})