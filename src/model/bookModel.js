const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },

    releasedAt: {
      type: Date,
      required: true,
      format: "YYYY-MM-DD",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
