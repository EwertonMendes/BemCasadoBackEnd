const Joi = require('@hapi/joi')

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required().max(255),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

//Create Event Validation
const createEventValidation = (data) => {
    const schema = Joi.object({
        nubiles: Joi.array(),
        guests: Joi.array(),
        eventDateTime: Joi.date(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createEventValidation = createEventValidation;