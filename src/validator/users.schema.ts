import * as Joi from "joi";

const regExp = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$");

export const UserSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string()
    .pattern(
      regExp,
      "Login must contain at least two characters, including letters and numbers."
    )
    .min(2)
    .max(100)
    .required(),
  password: Joi.string()
    .pattern(
      regExp,
      "Passwords must contain at least two characters letters and numbers."
    )
    .min(2)
    .max(100)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});
