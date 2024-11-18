const jwt = require("jsonwebtoken");

// const checkAuth = (req,res, next) =>{
//     try {
//         const token = req.headers.token
//         if(!token){
//             return res.status(401).json({
//                 msg:"Unauthorised: No token Provided"
//             })
//         }
//         const decoded = jwt.verify(token, "secret")
//         req.user = decoded
//         next()
//     } catch (error) {
//         return res.status(500).json({
//             msg:"Error",
//             error:error.message
//         })
//     }
// }

const checkAuth = (role) => {
  return (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
      
      req.user = decoded;
      console.log(req.user)
      if (role && !req.user.role.includes(role)) {
        return res.status(401).json({
          msg: "Unauthorised....",
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({
        msg: "Error in Authorizing",
      });
    }
  };
};

module.exports = checkAuth;
