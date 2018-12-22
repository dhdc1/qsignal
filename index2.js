var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

var path = require("path");

var port = process.env.PORT || 19009;

app.use(cors());

var client = require("socket.io-client")(`http://localhost:${port}`);
//client = {เครื่องเรียกคิว, broweser เรียกทดสอบ ที่ส่งสัญญาณมาที่ server}

app.get("/rxx/room1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rxx", q);
  res.send("rxx");
});

// {ฝั่ง server กระจายสัญญาณ}
io.on("connection", function(socket) {
  let ip = socket.handshake.address;
  console.log(ip, "connected");
  socket.on("rxx", async function(q) {
    console.log(`rxx from ${ip}`, q);
    await io.emit("rxx", q);
    await io.emit("blink", q);
  });
});

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
