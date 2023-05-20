const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    console.log('Creating the Post!!!');
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((result)=>{
        console.log('Post Created!!')
        return res.redirect('back');
    })
    .catch((error)=>{
        console.log('Error in creating the post',error);
        return;
    })
};

//to delete the post
module.exports.destroy = function(req,res){
    //find the post 1st
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object inot strings
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(error){
                console.log("Post is deleted",post.content);
                return res.redirect('back');
            })
            
        }else{
            console.log("unauthorized user deleting the post");
            return res.redirect('back');
        }
    })        
};


