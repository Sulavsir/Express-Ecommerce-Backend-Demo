const { body } = require("express-validator")
const { validate } = require("../middlewares/validator.middleware")

const signUpValidator = [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    validate
]

const signInValidator = [
  body("email").isEmail(),
  body("password").notEmpty(),
  validate,
];

//const productValidator = []

module.exports = {
    signUpValidator, signInValidator
}
