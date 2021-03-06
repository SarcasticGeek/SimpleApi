/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	username: {
  		type: 'string',
  		required: true,
      unique: true
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
    adminusercheck: {
      type: 'boolean',
      defaultsTo: false
    },
    posts: {
      collection: 'post',
      via: 'user'
    },
    role: {
      model: 'role'
    },

    //---------- JWT Configs
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeUpdate: function (values, next) {
      CipherService.hashPassword(values);
      next();
  },
  beforeCreate: function (values, next) {
      CipherService.hashPassword(values);
      next();
  }
};

