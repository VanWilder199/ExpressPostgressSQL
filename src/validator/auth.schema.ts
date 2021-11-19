import Joi from "joi";

export const AuthSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().alphanum(),
});
