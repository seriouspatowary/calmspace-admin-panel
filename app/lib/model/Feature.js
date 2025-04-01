import mongoose  from "mongoose";

const featureSchema = mongoose.Schema({
  
   title: {
       type: String,
       required: true,
    },
   subtitle: {
       type: String,
       required: true,
    },
    imgSrc: {
        type: String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
   },
    date:{
        type: Date,
        default: Date.now,
    },
});



export const Feature = mongoose.models.Feature || mongoose.model("Feature", featureSchema);
