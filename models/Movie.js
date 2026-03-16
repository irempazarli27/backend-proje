const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

  title: String,
  year: Number,

  rating: Number,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  averageRating: {
    type: Number,
    default: 0
  },

  reviewCount: {
    type: Number,
    default: 0
  }

  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Movie", movieSchema);