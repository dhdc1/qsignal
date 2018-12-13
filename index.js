var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

var path = require("path");

var port = process.env.PORT || 19009;

app.use(cors());

//app.use(express.static(path.join(__dirname, 'web')));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/web/index.html");
});

app.get("/test", function(req, res) {
  res.sendFile(__dirname + "/web/test.html");
});

var client = require("socket.io-client")(`http://localhost:${port}`);
//client = {เครื่องเรียกคิว, broweser เรียกทดสอบ ที่ส่งสัญญาณมาที่ server}

app.get("/scn/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("scn", "scn");
  await client.emit("blink", q);
  res.send("scn");
});

app.get("/doc/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc", "doc");
  await client.emit("blink", q);
  res.send("doc");
});

app.get("/lab/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("lab", "lab");
  await client.emit("blink", q);
  res.send("lab");
});

app.get("/xry/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("xry", "xry");
  await client.emit("blink", q);
  res.send("xry");
});

app.get("/drg/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("drg", "drg");
  await client.emit("blink", q);
  res.send("deg");
});

app.get("/fin/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("fin", "fin");
  await client.emit("blink", q);
  res.send("fin");
});

app.get("/err/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("err", "err");
  await client.emit("blink", q);
  res.send("err");
});

// {ฝั่ง server ส กระจายสัญญาณ}
io.on("connection", function(socket) {
  // for test
  let ip = socket.handshake.address;
  console.log(ip, " connected...");
  socket.on("chat", function(msg) {
    io.emit("chat", ip + " >> " + msg);
  });
  // end for test

  // update จอ wait-screen
  socket.on("scn", function() {
    io.emit("scn", "scn msg");
  });
  socket.on("doc", function() {
    io.emit("doc", "doc msg");
  });

  //update จอ wait-finance
  socket.on("fin", function() {
    io.emit("fin", "fin msg");
  });

  //update จอ wait-drug
  socket.on("drg", function() {
    io.emit("drg", "drg msg");
  });

  //update จอ wait-lab
  socket.on("lab", function() {
    io.emit("lab", "lab msg");
  });

  //update จอ wait-aray
  socket.on("xry", function() {
    io.emit("xry", "xry msg");
  });

  //update จอ wait-err
  socket.on("err", function() {
    io.emit("err", "err msg");
  });

  //ส่งสัญญาณกระพริบระบุ Queue
  socket.on("blink", function(q) {
    let date = new Date();
    let d = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(`[${d}]`, q);
    io.emit("blink", q);
  });
});

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
