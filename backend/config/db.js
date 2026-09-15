import mongoose from "mongoose";

export const connectDB = async () => {
     mongoose.connect("mongodb+srv://nayonhossain55:<db_password>@cluster0.j76pkh1.mongodb.net")
     .then(() => {
          console.log("MongoDB connected successfully");
     });
};
