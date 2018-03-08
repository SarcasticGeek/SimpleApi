/**
 * isAdminuser
 * @description :: Policy to check if a user is an admin or not
 */

var passport = require('passport'); 
 
module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (error, user, info) {
      if (error) return res.serverError(error);
      if (!user) 
       return res.unauthorized(null, info && info.code, info && info.message);
     req.user = user;
 	if(!user.adminusercheck){
    	return res.unauthorized(null, info && info.code, info && "USER IS NOT AN ADMIN");
    }
     next();
    })(req, res);
};