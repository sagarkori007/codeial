//controller - navigates the request 

module.exports.home = function(req,res){
    // .end to print in the page
    //res.end('<h1>Controller: Hi! </h1>')

    //to render the page from the views
    res.render('home',{
        title:'Home',
        message:'Hi from the Home',
    });
};