const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    
  title: { type: String, required: true },
  author: { type: String, required: true },
  designation: { type: String },
  imgSrc: { type: String },
  createdAt: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String},
  desc: { type: String},
  content: [
    {
      title: { type: String },
      body: { type: String },
    },
  ],
  message: { type: String },
});


export const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
