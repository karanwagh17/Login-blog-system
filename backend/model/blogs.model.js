const mongoose = require("mongoose");

const blogScema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },

    content: {
      type: String,
      require: true,
    },
    tags: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    publishedDate: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blogs", blogScema);

module.exports = blogModel;
