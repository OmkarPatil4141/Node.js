const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent')


fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
    if(err) return console.log(err);
    console.log(`Breed: ${data}`);

    /*superagent.get('https://dog.ceo/api/breeds/image/random').end((err,res)=>{
        if(err) return console.log(err);
        console.log(res.body.message);

        fs.writeFile('dog-img.txt',res.body.message, err=>{
            if(err) return console.log(err);
            console.log('Random dog image saved sucessfully');
        })
    })*/
    superagent.get(`https://dog.ceo/api/breeds/${data}/image/random`)
    .then(res =>{                                                //.then only deals with
        console.log(res.body.message);                           //fullfilled promises
        fs.writeFile('dog-img.txt',res.body.message, err=>{
            if(err) return console.log(err);
            console.log('Random dog image saved sucessfully');
        })
    })
    .catch(err=>{
        console.log(err.message);
    })

    // we started with get method which returned a promise and so on that we can chain then
    //method and on chain catch method
})

