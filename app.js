const express = require('express');
const app = express();
require('dotenv').config();

app.get("/", (req, res)=>{
    res.send("Task Manager API");
});

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, console.log(`Server stated listening on http://localhost:${port}/`));
    } catch (error) {
        console.log(error);
    }
}

start();