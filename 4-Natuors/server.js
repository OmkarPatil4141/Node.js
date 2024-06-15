const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const mongoose = require('mongoose')
const app = require('./app')

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DB_PASSWORD)
const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD)

mongoose//.connect(process.env.DATABASE_LOCAL,{
    .connect(DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology: true
}).then(() => console.log("DB connection successfull✅........."));



const tourSchema = new mongoose.Schema({
    // name:String ---> we can specify in that way mongoose uses native javascript datatpes

    //we can also use schematypes in order to validation

    name:
    {
        type:String,
        required : [true,'A tour must have a name'],
        unique : true
    },
    rating:
    {
        type:Number,
        default:4.5
    },
    price:
    {
        type:Number,
        required : [true,'A tour must have a price'],
    }
})

//In order to use schema we have to use model

const Tour = mongoose.model('Tour',tourSchema)

//lets create document

const testTour = new Tour({
    name:"The park camper",
    // rating:4.7,
    price:997
})

testTour
.save()
.then(doc => console.log(doc))
.catch(err => console.log('error🔥',err));

// console.log(process.env);
//we can start server in this way
const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`Server is started on port ${port}............`);
})

