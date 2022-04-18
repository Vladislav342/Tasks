const Joi = require('joi');

const validationSchemaForAuthor = Joi.object({
	author: Joi.string().min(1)
});

const validationSchemaForId 	= Joi.object({
	id: Joi.number().integer()
});

const validationSchemaForObject = Joi.object({
	id: Joi.number().integer().required(),
	author: Joi.string(),
	title: Joi.string().min(1).required(),
	year: Joi.number().required()
});

/*const valid = {
	schema: Joi.object({
		id: Joi.number().integer().required(),
		author: Joi.string().min(1).required(),
		title: Joi.string().min(1).required(),
		year: Joi.number().required()
	}),
	schema2: Joi.object({
		iD: Joi.number().integer().required()
	})
};*/


module.exports = { validationSchemaForAuthor, validationSchemaForId, validationSchemaForObject };


