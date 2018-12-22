var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

var path = require("path");

var port = process.env.PORT || 19009;

app.use(cors());
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/web/index2.html");
});

var client = require("socket.io-client")(`http://localhost:${port}`);
//client = {เครื่องเรียกคิว, broweser เรียกทดสอบ ที่ส่งสัญญาณมาที่ server}

app.get("/rx1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx1", q);
  res.send(`rx1 ${q}`);
});

// {ฝั่ง server กระจายสัญญาณ}
io.on("connection", function(socket) {
  //rx 1 - 9
  socket.on("rx1", async function(q) {
    await io.emit("rx1", q);
  });
  socket.on("rx2", async function(q) {
    await io.emit("rx2", q);
  });
  socket.on("rx3", async function(q) {
    await io.emit("rx3", q);
  });
  socket.on("rx4", async function(q) {
    await io.emit("rx4", q);
  });
  socket.on("rx5", async function(q) {
    await io.emit("rx5", q);
  });
  socket.on("rx6", async function(q) {
    await io.emit("rx6", q);
  });
  socket.on("rx7", async function(q) {
    await io.emit("rx7", q);
  });
  socket.on("rx8", async function(q) {
    await io.emit("rx8", q);
  });
  socket.on("rx9", async function(q) {
    await io.emit("rx9", q);
  });
  // end rx

  //screen 1-5
  socket.on("sc1", async function(q) {
    await io.emit("sc1", q);
  });
  socket.on("sc2", async function(q) {
    await io.emit("sc2", q);
  });
  socket.on("sc3", async function(q) {
    await io.emit("sc3", q);
  });
  socket.on("sc4", async function(q) {
    await io.emit("sc4", q);
  });
  socket.on("sc5", async function(q) {
    await io.emit("sc5", q);
  });
  // end screen

  //dx 1 - 9
  socket.on("dx1", async function(q) {
    await io.emit("dx1", q);
  });
  socket.on("dx2", async function(q) {
    await io.emit("dx2", q);
  });
  socket.on("dx3", async function(q) {
    await io.emit("dx3", q);
  });
  socket.on("dx4", async function(q) {
    await io.emit("dx4", q);
  });
  socket.on("dx5", async function(q) {
    await io.emit("dx5", q);
  });
  socket.on("dx6", async function(q) {
    await io.emit("dx6", q);
  });
  socket.on("dx7", async function(q) {
    await io.emit("rx7", q);
  });
  socket.on("dx8", async function(q) {
    await io.emit("dx8", q);
  });
  socket.on("dx9", async function(q) {
    await io.emit("dx9", q);
  });
  //end dx 1-9
});

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
