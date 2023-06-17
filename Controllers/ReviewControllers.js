const NGOReview = require("../Models/NGOReview");

exports.PostReview = async (req, res) => {
  try {
    const { ngo, rating, review } = req.body;
    const { userType } = req;
    let companyReviewer = null;
    let beneficiaryReviewer = null;

    if (userType === "company") {
      companyReviewer = req.user._id;
    } else if (userType === "Beneficiary") {
      beneficiaryReviewer = req.user._id;
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const exist = await NGOReview.find({
      $and: [{ $or: [{ companyReviewer }, { beneficiaryReviewer }] }, { ngo }],
    });

    if (exist.length !== 0) {
      return res
        .status(400)
        .json({ error: "You can review same ngo only once." });
    }
    const reviewObject = {
      ngo,
      rating,
      review,
    };

    if (companyReviewer !== null) {
      reviewObject.companyReviewer = companyReviewer;
    }

    if (beneficiaryReviewer !== null) {
      reviewObject.beneficiaryReviewer = beneficiaryReviewer;
    }

    const newReview = new NGOReview(reviewObject);
    const createdReview = await newReview.save();
    res.status(201).json({ success: true, review: createdReview });
  } catch (error) {
    console.warn(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create the review" });
  }
};

exports.getNGOReviews = async (req, res) => {
  try {
    if (req.userType === "company" || req.userType === "Beneficiary") {
      const id = req.body.ngoid;
      const reviews = await NGOReview.find({ ngo: id });
      if (!reviews || reviews.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No reviews found." });
      }
      return res.status(200).json({ success: true, reviews });
    }
    const ngoId = req.user._id;
    const reviews = await NGOReview.find({ ngo: ngoId });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found." });
    }
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get the reviews." });
  }
};
