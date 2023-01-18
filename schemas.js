const Joi = require('Joi')
module.exports.spaceSchema = Joi.object({
    space: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        // image: Joi.string().required(),
        description: Joi.string().required(),
        area: Joi.number().min(1).required()
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(0).max(5).required(),
        body: Joi.string().required()
    }).required()
})