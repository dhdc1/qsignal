var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

var path = require('path');

app.use(cors());

//app.use(express.static(path.join(__dirname, 'web')));

app.get("/web", function(req, res) {
  res.sendFile(__dirname + "/web/index.html");
});

app.get("/test", function(req, res) {
  res.sendFile(__dirname + "/web/test.html");
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
    io.emit("doc", "scn msg");
  });


  //update จอ wait-finance
  socket.on("fin", function() {
    io.emit("fin", "fin");
  });

  //update จอ wait-drug
  socket.on("drg", function() {
    io.emit("drg", "drg");
  });

  //update จอ wait-lab
  socket.on("lab", function() {
    io.emit("lab", "lab");
  });

  //update จอ wait-aray
  socket.on("xry", function() {
    io.emit("xry", "xry");
    
  });
});


var port = process.env.PORT || 19009;
http.listen(port, function() {
  console.log("listening on *:" + port);
});
