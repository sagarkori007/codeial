const express = require('express')
const app = express();
const express_layout = require('express-ejs-layouts');
const cookie_parser = require('cookie-parser');
const db = require('./config/mongoose');

const port = 8000;

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port ${port}`);
});

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

//middle wear, loading up the router
app.use('/',require('./routes/index'));

//to set the view engine
app.set('view engine', 'ejs');
//to make file name dynamic and set views folder
app.set('views', './views');


