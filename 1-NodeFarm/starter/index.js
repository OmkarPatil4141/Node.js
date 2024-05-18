// const start = 'Jay Ganesh❤️';
// console.log(start);

//////////////////////////////////////////////////////
////////////////File section//////////////////////////

//load the module
/*const fs = require('fs');



//Blocking code
const textIn = fs.readFileSync('./txt/input.txt' , 'utf-8');
console.log(textIn);

const textOut = `This is i know about the fruit : \n${textIn}\ninformation written at ${Date.now().toString()}`;
fs.writeFileSync('./txt/output.txt',textOut);

console.log('Data written successfully!!✌️'); 


//NON-Blocking code
fs.readFile('./txt/start.txt' ,'utf-8', (err,data1) => {
    // if(err) return console.log("Error 404 zindagi👾");   //if any error occurs
    fs.readFile(`./txt/${data1}.txt` ,'utf-8', (err,data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt` ,'utf-8', (err,data3) => {
            console.log(data3);
            fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`,'utf-8', err => {
                console.log('Successfully written in file.......✌️');
            });
        });
    });
});

console.log('Writing .......👊');  */



//////////////////////////////////////////////////////
////////////////Server 
//1.create 2.start


/*const http = require('http');

//1.create 
const server = http.createServer((req,res)=>{  // for each function that call back function runs
    console.log(req);
    res.end('Hello from the server......')

})

const port = 8000;
//2.start to listening incoming requests
server.listen(port,'127.0.0.1', ()=>{ //arguments 1.port 2.localhost ip(we have explicitly mentioned 3. callback (optional))

    console.log(`listening on the port ${port}`);
})

*/


//////////////////////////////////////////////////////
////////////////Routing 

const http = require('http');
const url = require('url');
const fs = require('fs');



const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)

    if(!product.organic) output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    
    return output;
}


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8')
const inputdata = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const DataObject = JSON.parse(inputdata);

const server1 = http.createServer((req,res) =>{

    const path = req.url;

    //overview page
    if(path === '/overview' || path === '/')
    {
        res.writeHead(200,{'Content-type':'text/html'})
        //as we parsed DATAOBJECT so we get array of objects so we have to loop it and give it as a palceholder
        const cardshtml = DataObject.map(el => replaceTemplate(tempCard,el)).join('')
        // console.log(cardshtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml);
        res.end(output);
    }
    //product page
    else if(path === '/product')
    {
        res.end('This is PRODUCT PAGE')
    }

    //API
    else if(path == '/api')
    {
        //for each request of /api callback function will be called and data will be fetched
        // instead we will take sysnchronously data only 1 time only 

        /*fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data1)=>{
            const dataobj = JSON.parse(data1); 
            res.writeHead(200, {'Content-type' : 'application/json'});
            res.end(inputdata);
        })*/

        res.writeHead(200, {'Context-type': 'application/json'});
        res.end(inputdata); 


    }

    //NOT Found
    else
    {
        res.writeHead(404,{
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world'
        })

        res.end('<h1>Page Not Found !!👾</h1>')

    }
})


server1.listen(3003,()=>{
    console.log('Server is running on port 3003...😍');
})


