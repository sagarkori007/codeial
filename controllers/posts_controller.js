const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    console.log('Creating the Post!!!');
    try{
        let post =  await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        console.log('Post Created!!',post);
        req.flash('success','Post Published!!!');
        return res.redirect('back');

    } catch(error) {
        console.log('Error in creating the post',error);
        req.flash('error','Error in creating the post!!!');
        return;
    }
};

//to delete the post
module.exports.destroy = async function(req,res){

    try{
        //find the post 1st
        let post = await Post.findById(req.params.id);

        //.id means converting the object inot strings
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id}); 
            req.flash('success',"Post is deleted");
            console.log("Post is deleted",post.content);
            return res.redirect('back');
            
        }else{
            console.log("unauthorized user deleting the post");
            req.flash('error',"unauthorized user deleting the post");
            return res.redirect('back');
        } 

    } catch(error) {
        console.log(error);
        return;
    }

      
};


