const Space = require('../models/spaces');
const Review = require('../models/review');
module.exports.createReview = async (req, res) => {
    const {id} = req.params;
    const space = await Space.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    space.reviews.push(review);
    await space.save();
    await review.save();
    req.flash('success', 'Successfully posted the review.');
    res.redirect(`/spaces/${id}`);
}

module.exports.deleteReview = async (req, res) =>{
    const {id, rid} = req.params;
    await Space.findByIdAndUpdate(id, { $pull: {reviews: rid}})
    await Review.findByIdAndDelete(rid);
    req.flash('success', 'Successfully deleted the review.');
    res.redirect(`/spaces/${id}`)
}