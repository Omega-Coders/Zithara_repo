require('dotenv').config()
tableRouter =require ('./routers/table_routers')
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
// const cors = require('cors')
const path = require('path')
const errorHandler = require('./middleware/errhandlemiddleware')

const PORT = process.env.PORT || 5000

const app = express()
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors());
app.use(express.json())

// app.use(express.static("./client/build"))

if(process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/table', tableRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//error handling
app.use(errorHandler)

const start =async () =>{
    try {
        // await .authenticate()
        // await sequelize.sync()
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
