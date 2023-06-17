const {
  PostReview,
  getNGOReviews,
} = require("../Controllers/ReviewControllers");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const ReviewRoutes = (app) => {
  app.post("/add-review", AuthMiddleware, PostReview);
  app.get("/get-reviews", AuthMiddleware, getNGOReviews );
};

module.exports = ReviewRoutes;
