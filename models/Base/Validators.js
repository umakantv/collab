const AppError = require("../../utils/AppError");

class BaseValidator {

    constructor(validationSchemas) {
        this.validationSchemas = validationSchemas;
    }
    
    validate(schemaName, data) {
        const validationSchema = this.validationSchemas[schemaName];
        
        if (!validationSchema) {
            throw new AppError('Could not validate this request.', 500);
        }

        const validationResponse = validationSchema.validate(data);
        
        if (validationResponse.error) {
            throw validationResponse.error;
        }
    }
}

module.exports = BaseValidator;