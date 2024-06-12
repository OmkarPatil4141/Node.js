const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))





//instead of using smae code thrice we can check id is valid or not only once 
exports.checkId = (req,res,next,val)=>{
    console.log(`The value of id is: ${val}`);
    if(req.params.id * 1 > tours.length)
        {
           return res.status(400).json({
                status : "failed",
                message : "invalid id"
            })
        }

        next();
}

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
exports.checkBody = (req,res,next)  =>{ 

    if(!req.body.name || !req.body.price )
    {
        return res.status(400).json({
            status : "fail",
            message : "Missing name or price"
        })
    }

    next();
}


///////////////////////////////////////////////////////
// Route handlers
//////////////////////////////////////////////////////
 exports.getTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        "status":"success",
        result : tours.length,
        data : {
            tours
        }
    })
}

 exports.getTour = (req,res)=>{
    
    const id = req.params['id'] * 1; //as everything coming from object is string just typecasted
//    const id = req.params.id * 1;
   const tour = tours.find(ele => ele.id === id)
   
//    if(!tour)
//    {
//        return res.status(400).json({            //return because only one response in order to invalid id
//            status :"Fail",
//            message : "Invalid Id"
//        })
//    }
   res.status(200).json({
       status :"suceess",
       data : {
           tour
       }
   })
}

 exports.delteTour = (req,res)=>{

    res.status(204).json({  //204 -> no content     
        status : "Success",
        data : null
    })
}

 exports.updateTour = (req,res)=>{

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


 exports.createTour = (req,res)=>{
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