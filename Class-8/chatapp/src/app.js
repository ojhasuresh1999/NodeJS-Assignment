import express from 'express';
import path from 'path';
import http from 'http';
import iplocate from 'node-iplocate';
import publicIp from 'public-ip';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;
const app = express();

app.set('port', port);
app.use(express.static('./public'));
// app.use(express.errorHandler());


const server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port", app.get('port'));
});

const io = new Server(server);


io.sockets.on('connection', (socket, username) => {

    function emitActiveUsers() {
        let activeUserList = [];
        io.sockets.sockets.forEach((socket) => {
            activeUserList.push(socket.data.username);
        });
        io.emit('activeusers', activeUserList);
    }

    socket.on('registeruser', (username) => {
        socket.data.username = username;
        publicIp.v4().then(ip => {
            iplocate(ip).then(function(results) {
                socket.data.city = results.city;
           });
        });
        emitActiveUsers();
    })

    socket.on('chat', (message) => {
        const messageData = {
            username : socket.data.username,
            city: socket.data.city,
            message: message.trim()
        }
        io.emit('chat', messageData);
    })
})



