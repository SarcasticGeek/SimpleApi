/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req ,res) {
		Post.find().exec(function (err,posts) {
			if(err){
        		return res.badRequest(err);
      		}
      		return res.ok(posts);
		});
	},
	show: function (req ,res) {
		var post_id = req.param('id');
		Post.findOne({ id:post_id }).exec(function (err, post){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!post) {
		    return res.notFound('Could not find post, sorry.');
		  }
		  return res.ok(post);
		});
	},
	store: function (req ,res) {
		Post.create({content:req.param('content'), user:req.user.id}).exec(function (err, post){
		  if (err) { return res.serverError(err); }
		  // req.user.posts.add([post]);
		  // req.user.save()
		  // .then(res.ok(data))
		  // .catch(function (error) {
		  // 	res.serverError(error);
		  // });
		  return res.ok();
		});
	},
	update: function (req ,res) {
		// Post.update({id: req.param('id')},req.param('content')).exec(function afterwards(err, updated){
		//   if (err) {
		//     return res.serverError(err);
		//   }
		//   return res.ok();
		// });

		Post.findOne({ id: req.param('id') }).exec(function (err, post){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!post) {
		    return res.notFound('Could not find Post, sorry.');
		  }
		  post.content = req.param('content');
		  post.save()
		  .then(res.ok(post))
		  .catch(function (error) {
		  	res.serverError(error);
		  });
		});
	},
	delete: function (req ,res) {
		Post.destroy({ id: req.param('id') }).exec(function (err){
		  if (err) {
		   return res.serverError(err);
		    }
		  
		  return res.ok();
		});
	} 
};

