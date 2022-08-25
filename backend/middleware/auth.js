const catchAsyncError = require("./catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//login check/authentication 
exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource ",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id)
    next();
})

//admin check
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            // console.log("prinitng req.user.role ",req.user.role ," and roles ",roles)
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource `,403));
        }
        next();
    }
}


