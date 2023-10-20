import mongoose from "mongoose";

// mongoose.connect('mongodb://127.0.0.1:27017/simplejwt',{
//     useNewUrlParser : true
// })
//     .then(db => console.log('Database is connected'))

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/merndb');
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error)
    }
}