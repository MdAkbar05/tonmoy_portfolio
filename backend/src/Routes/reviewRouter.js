const express = require("express");
const {
  handleGetReviews,
  handleCreateReview,
  handleDeleteReview,
  handleApprove,
  handleReject,
} = require("../Controllers/reviewsController");

const reviewRouter = express.Router();

// http://localhost:5000/api/reviews
reviewRouter.get("/", handleGetReviews);
reviewRouter.post("/", handleCreateReview);
reviewRouter.delete("/:id", handleDeleteReview);
reviewRouter.put("/:id/approve", handleApprove);
reviewRouter.put("/:id/reject", handleReject);

module.exports = reviewRouter;
