const ExpressError = require('./utils/ExpressError');
const {spaceSchema} = require('./schemas.js');
const Space = require('./models/spaces');
const Review = require('./models/review');
const {reviewSchema} = require('./schemas.js');

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, rid} = req.params;
    const review = await Review.findById(rid);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/spaces/${id}`);
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        // console.log(req.session.returnTo);
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
    next();
}
module.exports.validateSpace = (req, res, next) => {
    const {error} = spaceSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const camp = await Space.findById(id);
    if(!camp.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/spaces/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}
