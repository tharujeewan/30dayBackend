const Joi = require('joi');

exports.reportSchema = Joi.object({
    location: Joi.string().min(5).required(),
    issue: Joi.string().min(3).required(),
    status: Joi.string()
        .valid('Pending', 'In Progress', 'Resolved')
        .default('Pending')
});
