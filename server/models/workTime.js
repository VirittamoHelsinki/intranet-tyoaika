import mongoose from "mongoose";

const workTimeSchema = new mongoose.Schema({
   name: String,
   arrival: {
     type: Date,
     required: true,
   },
   departure: {
     type: Date,
   },
});

export const WorkTime = mongoose.model('WorkTime', workTimeSchema);














// import mongoose from "mongoose";

// const workTimeSchema = new mongoose.Schema({
//   arrival: {
//     type: Date,
//     required: true,
//   },
//   departure: {
//     type: Date,
//   },
// });

// export const WorkTime = mongoose.model('WorkTime', workTimeSchema);

