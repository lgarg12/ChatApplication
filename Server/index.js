const express = require("express");
const app = express();
const connectToDB  = require('./connection/ConnectingDB');
const AuthRouter = require("./Routes/AuthRoute");
const messageRouter = require('./Routes/messagesRoutes');
const cors = require("cors");
const Users = require("../models/Users");


const io = require("socket.io")(8080,{
    cors:{
        origin: 'http://localhost:3000'
    }
});

let users = [];
io.on('connection',socket => {
    console.log('User Connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = Users.find({_id: userId});
        if(!isUserExist){
            // socket.userId = userId;
            const user = {userId , socketId: socket.id};
            user.push(user);
            io.emit('getUsers',users);
        }
    });
    // io.emift('getUsers',socket.userId);
});



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