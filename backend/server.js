/**
 * Server Initiation
 */

// imports
const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const cors = require('cors');
const config = require("./constants/config")

// start server and connect to database
mongoose
// database
.connect(config.connection_string)
// server
.then(() => {
    // express
    const app = express()
    const corsOptions ={
        origin:'*', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
     }
    app.use(express.json())
    // cors
    app.use(cors(corsOptions));
    // routes
    app.use("/api", routes)
    // start server
    app.listen(5000, () => {
        console.log("Server has started!")
    })
})