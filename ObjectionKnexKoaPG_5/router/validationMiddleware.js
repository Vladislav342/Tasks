//const { validationSchemaForAuthor, validationSchemaForId, validationSchemaForObject } = require('./validSchema');

const validationMiddleware = (paramname, schema, ...emg) => {
	return async (ctx, next) => {
			let result = false;
			let result2 = false;

			function validation(paramname, schema){
				if(paramname === 'request.body'){
					return schema.validate(ctx.request.body);
				}else{
					return schema.validate({ [paramname]: ctx.params[paramname]});		
				}
			}

			result = validation(paramname, schema);

			if(emg.length>0){
				let [paramname2, schema2] = [...emg]; 
				result2 = validation(paramname2, schema2);
			} 

			if(result.error){
				//console.log('throw');
				throw new Error(result.error);
			}else if(emg.length > 0 && result2.error){
				//console.log('throw______2');
				throw new Error(result2.error);
			}else{
				//console.log('next')
				await next();
			}
	}
}

module.exports = validationMiddleware;