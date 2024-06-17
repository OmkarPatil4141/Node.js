const mongoose = require('mongoose')

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
        default:Date.now()
    },
    startDates: [Date],



})

//In order to use schema we have to use model

const Tour = mongoose.model('Tour',tourSchema)

module.exports = Tour;