/////////////////////////////////
//we can create our own promises
/////////////////////////////////

const fs = require('fs')
const { resolve } = require('path')
const superagent = require('superagent')

const readFilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) return reject('File not found!!!!!!🥲')  
            resolve(data)
        })
    })

}



const writeFilePro = (file_name,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file_name,data,(err)=>{
          if(err) reject("Unable to write into file🥲")
          
          resolve('success')
        })
    })
}



readFilePro(`${__dirname}/dog.txt`).then(data =>{  // as readfilePro returns promise we can apply then method on it
    console.log(`Breed: ${data}`);

   return superagent
    .get(`https://dog.ceo/api/breeds/image/random`)}) //cahining by returnin each promise
    .then(res =>{
        console.log(res.body.message); 

        return writeFilePro('dog-image.txt',res.body.message)
        // fs.writeFile('dog-image.txt',res.body.message,()=>{
        //     console.log('Data written sucessfully!!🥳');
        // }) 
    })
    .then(()=>{
        console.log('Data written sucessfully!!🥳');
    })
    .catch(err=>{
        console.log(err);            //single catch handler for allll
    })


