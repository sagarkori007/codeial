//controller - navigates the request 
const Post = require('../models/post');

module.exports.home = function(req,res){
    // .end to print in the page
    //res.end('<h1>Controller: Hi! </h1>')

    //to render the page from the views
    // res.render('home',{
    //     title:'Home',
    //     message:'Hi from the Home',
    // });

    //post accumulation, populate the user
    Post.find().populate('user')
    .then((result)=>{
        return res.render('home',{
            title:"Codeial | Home",
            posts: result
        });
    })
    .catch((error)=>{
        console.log('Error in fetching posts',error);
        return res.redirect('back');
    })

};