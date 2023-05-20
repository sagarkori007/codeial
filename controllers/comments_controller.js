const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //old call back function i have used it here - i have degrade to mongo 6 version
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}


//to delete the comment
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){

            //
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }
    });
}