const express = require('express')
const fs = require('fs')
const app = express();

//Middleware
app.use(express.json())

// Custom Middleware  it is going to run for all requestss
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


/*
//for routing
app.get('/',(req,res) =>{
    //we are just sending msg (string in above response)
    // res.status(200).send("Hello from the server side🥳")
    
    //we can send json just by json function
    res.status(200).json({message:"Hello from the server side🥳",app : "Natours"})

})

app.post('/',(req, res)=>{
    res.send('You can do post here🔥')
})

*/

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        "status":"success",
        result : tours.length,
        data : {
            tours
        }
    })
}

const getTour = (req,res)=>{
    
    const id = req.params['id'] * 1; //as everything coming from object is string just typecasted
   // const id = req.params.id * 1;
   const tour = tours.find(ele => ele.id === id)
   if(!tour)
   {
       return res.status(400).json({            //return because only one response in order to invalid id
           status :"Fail",
           message : "Invalid Id"
       })
   }
   res.status(200).json({
       status :"suceess",
       data : {
           tour
       }
   })
}

const delteTour = (req,res)=>{

    if(req.params.id * 1 > tours.length)
    {
       return res.status(400).json({
            status : "failed",
            message : "invalid id"
        })
    }

    res.status(204).json({  //204 -> no content     
        status : "Success",
        data : null
    })
}

const updateTour = (req,res)=>{

    if(req.params.id * 1 > tours.length)
    {
       return res.status(400).json({
            status : "failed",
            message : "invalid id"
        })
    }

    res.status(200).json({
        status : "Success",
        data : {
            tour : "updated tour here "
        }
    })
}


const createTour = (req,res)=>{
    // console.log(req.body);
    // res.send('Done')
    const NewId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id : NewId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
        //JSON.stringify(tours)
        //converts a JavaScript value to a JSON string, optionally replacing values if a replacer function 
        //is specified or optionally including only the specified properties if a replacer array is specified.
        res.status(201).json({
            status : "success",
            data : {
                tours : newTour
            }
        })
    })   
}


///////////////////////////////////////////////////////
// Refactoring code 1
//////////////////////////////////////////////////////
/*
//get
app.get('/api/v1/tours',getTours);
//get by id
app.get('/api/v1/tours/:id',getTour)
//delete
app.delete('/api/v1/tours/:id',delteTour)
//update
app.patch('/api/v1/tours/:id',updateTour)
//create 
app.post('/api/v1/tours',createTour)

*/


///////////////////////////////////////////////////////
// Refactoring code 2
//////////////////////////////////////////////////////

app.route('/api/v1/tours').get(getTours).post(createTour)

app.route('/api/v1/tours/:id').get(getTour).delete(delteTour).patch(updateTour)






//we can start server in this way
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is started on port ${port}..And waiting for requests`);
})