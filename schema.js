import Joi from 'joi';

export const listingschema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
      image: Joi.object({
    url: Joi.string().allow("", null),
    filename: Joi.string().allow("", null)
}).optional()
    }).required()
});

export const reviewschema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});