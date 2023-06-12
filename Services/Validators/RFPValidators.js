const Joi = require("joi");
exports.RFPValidator = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  remaining_amount: Joi.number(),
  sectors: Joi.array().items(Joi.string().required()).required(),
  states: Joi.array().items(Joi.string().required()).required(),
  timeline: Joi.string().required(),
  company: Joi.string().required(),
  date: Joi.date().required(),
});
