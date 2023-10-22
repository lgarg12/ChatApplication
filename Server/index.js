const express = require("express");
const app = express();
const connectToDB  = require('./connection/ConnectingDB');
const AuthRouter = require("./Routes/AuthRoute");
const messageRouter = require('./Routes/messagesRoutes');
const cors = require("cors");

// Some MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin:"http://localhost:3000",
        Credentials:true,
    })
)

app.use('/api/auth',AuthRouter);
app.use("/api",messageRouter);

const port = 8000;
app.get("/",(req,res) => {
    res.write("Welcome");
})

// Database connection
connectToDB();
app.listen(port , () => {
    console.log('listening on port ' + port)
})