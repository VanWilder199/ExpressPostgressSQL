import * as Joi from "joi";

const regExp = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$");

export const GroupSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string()
    .pattern(
      regExp,
      "Login must contain at least two characters, including letters and numbers."
    )
    .min(2)
    .max(100)
    .required(),
  permissions: Joi.array().required(),
});
