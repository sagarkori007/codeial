//controller - navigates the request 
const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req,res){
//     // .end to print in the page
//     //res.end('<h1>Controller: Hi! </h1>')

//     //to render the page from the views
//     // res.render('home',{
//     //     title:'Home',
//     //     message:'Hi from the Home',
//     // });

//     //post accumulation, populate the user
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({},function(err,user){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users: user
//             });

//         });
//     });

// };

//async await is implemented 
module.exports.home = async function(req,res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    
        let user = await User.find();
        
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: user
        });

    } catch(error) {
        console.log("error in rendering the posts",error);
        return ;

    }
};