const express = require('express')
const app = express();
const express_layout = require('express-ejs-layouts');
const cookie_parser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passport_local = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const port = 8000;

//sass to convert scss into css
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));

//get post info/ decrept the post to reaad body
app.use(express.urlencoded());

//cookie 
app.use(cookie_parser());


//set static file
app.use(express.static('./assets'));
//for layout and it should be before the router
app.use(express_layout);
//extract style and scripts from the subpage into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//to set the view engine
app.set('view engine', 'ejs');
//to make file name dynamic and set views folder
app.set('views', './views');

//session 
//mongo store is used for storing the sessin 
app.use(session({
    name: 'codeial',
    //todo change the secret before deployment to production 
    secret: 'blahsomething',

    //a session not initialized - extra data is not saved
    saveUninitialized: false,

    //session data is there - u want to rewrite it?
    resave: false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(error){
            console.log(error || 'connect-mongodb is fine');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


//middle wear, loading up the router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port ${port}`);
});


