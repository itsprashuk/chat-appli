const express=require('express')
const io = require("socket.io")(8000)
const app=express();

const cors=require('cors')
 app.use(cors());

 app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

// app.get('/api/examples', (req, res)=> {
//     res.send("hello");
// });

  const users={};
 

  

    

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("new user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
   
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message,name: users[socket.id]})
    })

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
});
