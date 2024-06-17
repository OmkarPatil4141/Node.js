// const fs = require('fs')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const Tour = require('../Models/tourModel')

/*
/////////////////////////////////
//Method 1 of creating document
////////////////////////////////
//lets create document
const testTour = new Tour({
    name:"The park camper",
    // rating:4.7,
    price:997
})

//save into database
testTour
.save()
.then(doc => console.log(doc))
.catch(err => console.log('error🔥',err));

*/


///////////////////////////////////////////////////////
// Route handlers
//////////////////////////////////////////////////////

/////////////////////////////////
//Method 1 of creating document ->Tour.create({})
////////////////////////////////
exports.createTour = async(req,res) =>
    {
        try
        {
            const newTour = await Tour.create(req.body);
            res.status(200).json({
                status:"success",
                dats : {
                    tour : newTour
                }

            })

        }
        catch(err)
        {
            res.status(400).json({
                status:"fail",
                message: err
            })
        }
        
        
    }

 exports.getTours = async(req,res)=>{
    try
    {
        const tours = await Tour.find();
        res.status(200).json({
            "status":"success",
            result : tours.length,
            data : {
                tours
            }
        })
    }
    catch(err)
    {
        res.status(200).json({
            "status":"success",
            message:err
        })
    }
        
}

 exports.getTour = async(req,res)=>{
    
    try
    {
        const tour = await Tour.findById(req.params.id);
        // instead by findID we can use findone like
        // Tour.findOne({_id:666d7cd402379557e484e691})
        res.status(200).json({
            "status":"success",
            data : {
                tour
            }  
        })
    }
    catch(err)
    {
        res.status(200).json({
            "status":"success",
            message:err
        })
    }

}



 exports.updateTour =async (req,res)=>{

    try {

        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })
        
    } catch (err) {
        res.status(400).json({
            "status":"fail",
            message:err
        })
    }

   
}

exports.delteTour = async(req,res)=>{

    try{
        
        // const del = await Tour.deleteOne(req.params.id)
        await Tour.findByIdAndDelete(req.params.id);
        //{_id:"666d7cd402379557e484e691"}

        res.status(204).json({  //204 -> no content     
            status : "Success",
            data : null
        })
    }catch(err){
        res.status(400).json({
            "status":"fail",
            message:err
        })
    }
    
}
 

////////////////////////////////////////////////////////////////////////////////
//
//Deleted ones 
//
///////////////////////////////////////////////////////////////////////////////

/*1.exports.createTour = (req,res)=>{
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
}*/

//2.instead of using same code thrice we can check id is valid or not only once 
/*exports.checkId = (req,res,next,val)=>{
    console.log(`The value of id is: ${val}`);
   
    if(req.params.id * 1 > tours.length)
        {
           return res.status(400).json({
                status : "failed",
                message : "invalid id"
            })
        } 
          we comment because tours we commented due to file data  
    

        next();
}*/ 


/*

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
} */


/*    exports.getTour = (req,res)=>{
    
        //     const id = req.params['id'] * 1; //as everything coming from object is string just typecasted
           const id = req.params.id * 1;
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

        */