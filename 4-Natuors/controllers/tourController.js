// const fs = require('fs')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const Tour = require('../Models/tourModel')
const APIFeature = require('../utils/apiFeatures')

exports.aliasTopTours = (req,res,next) =>{

    req.query.limit = '5';
    req.query.sort = '-ratingsAverage price';
    req.query.fields = 'name price ratingsAverage summary difficulty'
    next();
}

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
exports.getMonthlyPlan = async(req,res)=>{
    try{

        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind:"$startDates"
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month:"$startDates"},
                    numToursStart: {$sum:1},
                    tours:{$push:"$name"}
                }
            },
            {
                $addFields: {month:'$_id'}
            },
            {
                $project:{_id:0}
            },
            {
                $sort:{numToursStart:-1}
            },
            {
                $limt:12
            }

        ])


        res.status(200).json({
            status:"success",
            // size:plan.length,
            data : {
                plan
            }

        })
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}
exports.getTourStats = async(req,res)=>{
    try{ 
        // each element in array is one stage
        //one obbject is one stage  
        const stats = await Tour.aggregate([
            {
                $match:{ ratingsAverage: {$gte:4.5} }
            },
            { 
                $group:
                {
                    _id:{ $toUpper: "$difficulty"}, //_id means we have to group by what
                
                   numTours :{$sum : 1},
                   numRating: {$sum:"$ratingsQuantity"},
                   avgRating : { $avg : '$ratingsAverage'},
                   avgPrice: { $avg:'$price'},
                   minPrice: { $min: '$price'},
                   maxPrice: { $max: '$price'}
                }
            },
            {
                $sort:{avgPrice:1}
            },
            // {
            //     $match:{ _id: {$ne : "EASY"}}
            // }
        ])
        res.status(200).json({
            status:"success",
            data : {
                stats
            }

        })

    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}



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
        
    //Execute Query
    const features = new APIFeature(Tour.find(),req.query).filter().sort().limitFields().paginate();
    const tours = await features.query;

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
            "status":"fail",
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

        /*
        // const tours = await Tour.find(); //finds all tours
        
        // 1A) Filtering
        // const queryObj = {...req.query}

        // const  excludedFields = ['page','sort','limit','fields'];

        // excludedFields.forEach(el => delete queryObj[el])

        console.log(req.query);

        
        //filtering using method 1
        //req.query gives us the object of query parameter 
        //e.g.
      /*  const tours = await Tour.find({
            difficulty:"easy",
            duration:5
        });*/
    
    //2. filtering using special methods of mongoose

    /*const tours = await Tour.find()
                                .where("difficulty")
                                .equals("easy")
                                .where("duration")
                                .equals(5); */

         
    
    //  1b)Advance filtering for operators

    // let queryStr = JSON.stringify(queryObj);

    // //here \b for only exact lt or lte and g for all occurences 
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, opert=> `$${opert}`);
    // // console.log(queryStr);

    
    
    // let query =  Tour.find(JSON.parse(queryStr)); 

    //  2)sorting 

    // if(req.query.sort)
    // {
    //     const SortBy = req.query.sort.split(',').join(' ');
    //     console.log(SortBy);
    //     // query = query.sort(req.query.sort)
    //      query = query.sort(SortBy)
    // }
    // else{
    //     query = query.sort('-createdAt')
    // }

    //3 . field limiting

    // if(req.query.fields){

    //     const fields = req.query.fields.split(',').join(' ');

    //     query = query.select(fields);
    // }
    // else
    // {
    //     query = query.select('-__v'); // negative sign indicates exclude that field 
    // }
    


    //4) pagination
    //limit -> AMOUNT of results per page   
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // //page=2&limit=10 1to10 on page 1, 11to20 on page 2...
    // query = query.skip(skip).limit(limit);

    // if(req.query.page){
    //     const numTours = await Tour.countDocuments();
    //     if(skip >= numTours) throw new Error('This Page Does Not Exit');
    // }
    
        
        
        
        


