const mongoose = require('mongoose')

const slugify = require('slugify')

const tourSchema = new mongoose.Schema({
    // name:String ---> we can specify in that way mongoose uses native javascript datatpes

    //we can also use schematypes in order to validation

    name:
    {
        type:String,
        required : [true,'A tour must have a name'],
        unique : true,
        trim:true
    },
    slug: String,
    duration:
    {
        type:Number,
        required : [true,'A tour must have a duration'],
    },
    maxGroupSize:
    {
        
        type:Number,
        required : [true,'A tour must have a Group size'],
    },
    difficulty:
    {
        type:String,
        required : [true,'A tour must have a difficulty'],

    },

    ratingsAverage:
    {
        type:Number,
        default:4.5
    },

    ratingsQuantity:
    {
        type:Number,
        default:0
    },

    price:
    {
        type:Number,
        required : [true,'A tour must have a price'],
    },

    priceDiscount:Number,

    summary:
    {
        type:String,
        trim:true,
        required:[true,'A tour must have a description']

    },

    imageCover:{
        type:String,
        required: [true,'A tour must have a cover image']
    },

    images:[String],

    description:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates: [Date],

    secretTour:{
        type:Boolean
    }

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//defining virtula parameters
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
})

//DOCUMENT middleware : runs before .save(), .create()

tourSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true});
    next();
});

/*
tourSchema.pre('save',function(next){
    console.log("Will save document.....");
    next();
});

//DOCUMENT middleware : runs after .save(), .create()
tourSchema.post('save',function(doc,next) {
    console.log(doc);
    next();
});
*/

//Query Middleware 

 
//it does not run for gettour as there is different handler and
//there we have used FindById() so instead of making different miidleware we can use regular expression
// tourSchema.pre('find',function(next){
tourSchema.pre(/^find/,function(next){
    this.find({secretTour:{$ne:true}})
    this.start = Date.now();
    next();
})


tourSchema.post(/^find/, function(docs,next){
    console.log(docs);
    console.log(`Querry took ${Date.now()-this.start} milliseconds`);
    next();
})


//Aggregation middleware

tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
    next();
})
//In order to use schema we have to use model
const Tour = mongoose.model('Tour',tourSchema)

module.exports = Tour;