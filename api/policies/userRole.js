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

     var permissions = ['index','show','store','update','delete'];
     var controller = req.options['controller'];
     var action = req.options['action'];
     var authuser = req.user;
     var ok_per = false;
     User.findOne({id: authuser.id}).populateAll().exec(function(err,user){
        if(err){
            return res.serverError(err);
        }
        if(user.role == null){
            return res.forbidden('You do not have a permission.');
        }else{
            Permission.find().populate('roles')
            .exec(function (err, permissions){
                permissions.forEach(function(permission) {
                    if(permission.name === action){
                        ok_per = true;
                    }
                });
                if(ok_per){
                     res.ok();
                }else{
                    return res.forbidden('You do not have a permission.');
                }
            });
        }

     });
    //next();
    //return res.forbidden('You do not have a permission.');
    })(req, res);
};
