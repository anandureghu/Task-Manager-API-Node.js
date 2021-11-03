const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

// Import Router
const authenticationRouter = require('./routes/auth');
const taskRouter = require("./routes/task");

// Import Connection
const connectDB = require('./db/connect');

// import Middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const authenticationMiddleware = require('./middleware/auth');

// Extra security
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res)=>{
    res.send("Task Manager API");
});

app.use("/api/v1/auth", authenticationRouter);
app.use("/api/v1/tasks", authenticationMiddleware, taskRouter);


app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server stated listening on http://localhost:${port}/`));
    } catch (error) {
        console.log(error);
    }
}

start();