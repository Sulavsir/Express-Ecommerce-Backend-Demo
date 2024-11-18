const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (!user) return res.status(400).json({ msg: "User Doesn't exist" });

    const passMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passMatch)
      return res.status(401).json({
        msg: "Password donot Match",
      });

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );

    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      msg: "User Logged In Successfully",
      token,
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
