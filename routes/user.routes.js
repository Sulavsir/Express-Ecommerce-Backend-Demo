const router = require("express").Router();
const { signIn, signUp } = require("../controllers/user.controller");
const { signInValidator, signUpValidator } = require("../validators/auth.validators");

router.post("/sign-in", signInValidator ,signIn);
router.post("/sign-up", signUpValidator ,signUp);

module.exports = router;
