import mongoose from "mongoose";
import listing from "../models/listing.js";
import initdata from "./data.js";
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/LiveFree');
};
main()
    .then((res)=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    });
async function seedListings() {
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj, owner:'6adecc06c4b712b2152be412'}));
    await listing.insertMany(initdata.data);
    console.log("Listings seeded successfully");
}
seedListings();