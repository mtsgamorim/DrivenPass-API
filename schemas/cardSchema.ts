import Joi from "joi";

const cardSchema = Joi.object({
  title: Joi.string().required(),
  number: Joi.string()
    .pattern(/^[0-9]{16}$/)
    .required(),
  name: Joi.string().uppercase().required(),
  cvc: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  expirationDate: Joi.string()
    .pattern(/^[0-9]{2}\/[0-9]{2}$/)
    .required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("crédito", "débito", "ambos").required(),
});

export default cardSchema;
