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

app.get("/scn", async (req, res) => {
  await client.emit("scn", "scn");
  res.send("scn");
});

app.get("/doc", async (req, res) => {
  await client.emit("doc", "doc");
  res.send("doc");
});

app.get("/lab", async (req, res) => {
  await client.emit("lab", "lab");
  res.send("lab");
});

app.get("/xry", async (req, res) => {
  await client.emit("xry", "xry");
  res.send("xry");
});

app.get("/drg", async (req, res) => {
  await client.emit("drg", "drg");
  res.send("deg");
});

app.get("/fin", async (req, res) => {
  await client.emit("fin", "fin");
  res.send("fin");
});



io.on("connection", function(socket) {
  // for test
  let ip = socket.handshake.address;
  console.log(ip, "connected...");
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
});


http.listen(port, function() {
  console.log("listening on *:" + port);
});
