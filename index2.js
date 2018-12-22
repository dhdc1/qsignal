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

app.get("/rx/ch1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx-ch1", q);
  res.send(`rx ch1 ${q}`);
});

// {ฝั่ง server กระจายสัญญาณ}
io.on("connection", function(socket) {
  socket.on("rx-ch1", async function(q) {
    await io.emit("rx-ch1", q);
    await io.emit("blink", 'rx-ch1-call');
  });
});

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
