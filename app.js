const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");

// Express setup
const app = express();
const port = 3000;

// Socket.io setup
const server = http.createServer(app);
const io = socketio(server);

// ejs setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
    console.log("Connected!!");
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
