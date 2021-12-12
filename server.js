const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.port || 80;
const bodyparser = require("body-parser");

app.get("/user2.html", (req, res) => {
    res.sendFile(__dirname+"/user2.html");
});

app.get("/user1.html", (req, res) => {
    res.sendFile(__dirname+"/user1.html");
});

app.get("/jquery-3.6.0.min.js", (req, res) => {
    res.sendFile("/jquery-3.6.0.min.js");
});

http.listen(port, () => {
    console.log("Server Is Started At http://127.0.0.1:"+port);
});

io.on('connection', (socket) => {
    var id = [socket.id];
    console.log("A User Connected With This As = "+id[0]+".");
    socket.on("Omoved", (pos) => {
        socket.broadcast.emit("Omoved", pos);
    });
    socket.on('Xmoved', (pos) => {
        socket.broadcast.emit("Xmoved", pos);
    });
});

