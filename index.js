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
  await client.emit("scn", q);
  res.send("scn");
});

app.get("/doc/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc", q);
  res.send("doc");
});

app.get("/lab/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("lab", q);;
  res.send("lab");
});

app.get("/xry/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("xry", q);
  res.send("xry");
});

app.get("/drg/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("drg", q);
  res.send("deg");
});

app.get("/fin/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("fin", q);
  res.send("fin");
});

app.get("/err/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("err", q);
  res.send("err");
});

app.get("/fnt/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("fnt", q);
  res.send("fnt");
});


// {ฝั่ง server กระจายสัญญาณ}
io.on("connection", function(socket) {
  
  let ip = socket.handshake.address;
  console.log(ip, "connected");  
 

  // update จอ wait-screen
  socket.on("scn", async function(q) {
    console.log(`scn from ${ip}` ,q);
    await io.emit("scn", "scn msg");
    await io.emit("blink", q);
  });
  socket.on("doc", async function(q) {
    console.log(`doc from ${ip}` ,q);
    await io.emit("doc", "doc msg");
    await io.emit("blink", q);
  });

  //update จอ wait-finance
  socket.on("fin", async function(q) {
    console.log(`fin from ${ip}` ,q);
    await io.emit("fin", "fin msg");
    await io.emit("blink", q);
  });

  //update จอ wait-drug
  socket.on("drg", async function(q) {
    console.log(`drg from ${ip}` ,q);
    await io.emit("drg", "drg msg");
    await io.emit("blink", q);
  });

  //update จอ wait-lab
  socket.on("lab", async function(q) {
    console.log(`lab from ${ip}` ,q);
    await io.emit("lab", "lab msg");
    await io.emit("blink", q);
  });

  //update จอ wait-aray
  socket.on("xry", async function(q) {
    console.log(`xry from ${ip}` ,q);
    await io.emit("xry", "xry msg");
    await io.emit("blink", q);
  });

  //update จอ wait-err
  socket.on("err", async function(q) {
    console.log(`err from ${ip}` ,q);
    await io.emit("err", "err msg");
    await io.emit("blink", q);
  });

  //update จอ wait-front-nurse
  socket.on("fnt", async function(q) {
    console.log(`fnt from ${ip}` ,q);
    await io.emit("fnt", "fnt msg");
    await io.emit("blink", q);
  });

 
});

// timmer ส่งสลับ page
let page = 1;
/*let timmerPage = setInterval(() => {
  if (page == 1) {
    page = 2;
  } else {
    page = 1;
  }
  console.log("page = ", page);
  io.emit("page", page);
}, 1000 * 10);*/

// จบ timmer ส่ง สลับ page

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
