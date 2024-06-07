const fs = require('fs')
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


const getDogPic = async ()=>{

    try{

    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breeds/image/random`);
    console.log(res.body.message);

    await writeFilePro('dog-image.txt',res.body.message);
    console.log('Data written sucessfully!!🥳');
   }
   catch(err)
   {
    console.log(err);
    throw(err)
   }

   return '2: Completed 🐶'
}

/*
console.log('1:before calling DogPic');
getDogPic().then(data =>console.log(data)).catch(err=>console.log(err));
console.log('3:after calling DogPic');

instead of then and catch we can do it by IIF
*/

(async ()=>{
    try{
        console.log('1:before calling DogPic');
        const x = await getDogPic()
        console.log(x);
        console.log('3:after calling DogPic');
    }
    catch(err)
    {
        console.log('ERROR🔥');
    }
})();
