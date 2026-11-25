
import mongoose from "mongoose";
const listingSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
       },
       image:{
        filename:{
            type:String,
            default:"listingimage"
        },
        url:{
            type:String,
            default:"https://unsplash.com/photos/people-walking-on-cobblestone-street-fBLaWoXZ5q8",
            set:(v)=>{
              return v===""? "https://unsplash.com/photos/people-walking-on-cobblestone-street-fBLaWoXZ5q8" : v;
            }
       }},
       price:{
        type:Number,
       },
         location:{
            type:String,
         },
         country:{
            type:String,
         },
        review:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review"
            }
        ],
        owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
        });
        const Listing = mongoose.model("Listing",listingSchema);
        export default Listing;