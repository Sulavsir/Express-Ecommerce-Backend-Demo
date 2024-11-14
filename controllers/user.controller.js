const userModel = require("../model/user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) return res.status(400).json({ msg: "User Already Exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const signedUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    if (!signedUser)
      return res.status(400).json({ msg: "Error creating users" });
    return res.status(201).json({
      msg: "User Signed up successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: "User Doesn't exist" });

    const passMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passMatch)
      return res.status(401).json({
        msg: "Password donot Match",
      });

    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      msg: "User Logged In Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  signIn,
  signUp,
};
