const Post = require('../models/post');

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

