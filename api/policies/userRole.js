/**
 * userRole
 *
 * @module      :: Policy
 * @description :: Check user role to confirm his/her permissions
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

var passport = require('passport');
 
module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (error, user, info) {
      if (error) return res.serverError(error);
      if (!user) 
       return res.unauthorized(null, info && info.code, info && info.message);
     req.user = user;
     
     var permissions = ['show','store','update','delete'];
     var controller = req.options['controller'];
     var action = req.options['action'];
     var authuser = req.user;
     console.log(authuser);
     authuser.role.permissions.forEach(function(permission) {
         if(permission == action)
             next();
     });
     return res.forbidden('You do not have a permission.');
    })(req, res);
};
