// express is the main framework. 
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postRouter = require('./routes/post')
const cors = require('cors')

// setting the port for running in our machine 
// as well as we have used the process.env that if we host the site then hosting site will assigned a different port
const PORT = process.env.PORT || 5000

app.use(cors())
//using bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
dotenv.config()
app.use(express.json())

// connecting with datbase
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log('data base connection is successful')).catch((err)=> console.log(err))

//defining the port 
app.use('/api/post', postRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running successfully at ${PORT}`)
})