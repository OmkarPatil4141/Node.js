const fs = require('fs');
const crypto = require('crypto')

const start = Date.now()

//We can change the size of thread pool from 4 to requied
process.env.UV_THREADPOOL_SIZE = 1 ; //we have decreased it from 4 to 1


setTimeout(() => console.log("Timer 1 finished"),0);

setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile('test-file.txt',() =>{
    console.log('File reading finished');
    console.log("--------------------------------------------");
    setTimeout(() => console.log("Timer 2 finished"),0);
    setTimeout(() => console.log("Timer 3 finished"),3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log('Process .nextTick , it will run first then immediate depends on polling'));

    crypto.pbkdf2("password","salt",100000,1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted");
    })
    crypto.pbkdf2("password","salt",100000,1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted");
    })
    crypto.pbkdf2("password","salt",100000,1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted");
    })
    crypto.pbkdf2("password","salt",100000,1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted");
    })

})

console.log('Hello from top-level code');

