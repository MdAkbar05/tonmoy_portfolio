const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientReviewSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientTitle: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    clientImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ClientReview = mongoose.model("ClientReview", clientReviewSchema);

module.exports = ClientReview;
