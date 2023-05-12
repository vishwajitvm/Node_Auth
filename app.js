//Modules Import
const express  = require('express') ;
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ;
const homeRouter = require('./routers/homeRouter')

//variables
const port = process.env.port || 8080 ;
const app = express() ;
let time = new Date();
//Views
app.set('view engine' , 'ejs')

//Static file[css]
app.use(express.static('public'))

//MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/' , homeRouter)
app.use('/dashbord' , homeRouter)

//MONGO DB CONNECTION mongodb://localhost:27017
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/node_auth_data' , {useNewUrlParser: true});
    console.log('====================================');
    console.log(`Mongo DB is  Connect ${time. getHours() + ":" + time}`);
    console.log('====================================');
}

app.listen(port) ;