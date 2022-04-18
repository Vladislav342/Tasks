const Joi = require('joi');

const valid = {
	schema: Joi.object({
		id: Joi.number().integer().required(),
		author: Joi.string().min(1).required(),
		title: Joi.string().min(1).required(),
		year: Joi.number().required()
	}),
	schema2: Joi.object({
		iD: Joi.number().integer().required()
	})
};


/*let schema = Joi.object({
	id: Joi.number().integer().required(),
	author: Joi.string().min(1).required(),
	title: Joi.string().min(1).required(),
	year: Joi.number().required()
});*/



module.exports = valid;


