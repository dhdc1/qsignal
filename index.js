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

app.get("/scn1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("scn1", q);
  res.send("scn1");
});

app.get("/scn2/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("scn2", q);
  res.send("scn2");
});
app.get("/scn3/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("scn3", q);
  res.send("scn3");
});
app.get("/scn4/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("scn4", q);
  res.send("scn4");
});

app.get("/doc1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc1", q);
  res.send("doc1");
});

app.get("/doc2/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc2", q);
  res.send("doc2");
});

app.get("/doc3/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc3", q);
  res.send("doc3");
});

app.get("/doc4/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("doc4", q);
  res.send("doc4");
});



app.get("/lab/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("lab", q);
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
  socket.on("scn1", async function(q) {
    console.log(`scn from ${ip}`, q);
    await io.emit("scn1", "scn msg");
    await io.emit("blink", q);
  });

  socket.on("scn2", async function(q) {
    console.log(`scn from ${ip}`, q);
    await io.emit("scn2", "scn msg");
    await io.emit("blink", q);
  });
  socket.on("scn3", async function(q) {
    console.log(`scn from ${ip}`, q);
    await io.emit("scn3", "scn msg");
    await io.emit("blink", q);
  });
  socket.on("scn4", async function(q) {
    console.log(`scn from ${ip}`, q);
    await io.emit("scn4", "scn msg");
    await io.emit("blink", q);
  });

  socket.on("doc1", async function(q) {
    console.log(`doc from ${ip}`, q);
    await io.emit("doc1", "doc msg");
    await io.emit("blink-doc", q);
  });

  socket.on("doc2", async function(q) {
    console.log(`doc from ${ip}`, q);
    await io.emit("doc2", "doc msg");
    await io.emit("blink-doc", q);
  });

  socket.on("doc3", async function(q) {
    console.log(`doc from ${ip}`, q);
    await io.emit("doc3", "doc msg");
    await io.emit("blink-doc", q);
  });

  socket.on("doc4", async function(q) {
    console.log(`doc from ${ip}`, q);
    await io.emit("doc4", "doc msg");
    await io.emit("blink-doc", q);
  });

  //update จอ wait-finance
  socket.on("fin", async function(q) {
    console.log(`fin from ${ip}`, q);
    await io.emit("fin", "fin msg");
    await io.emit("blink", q);
  });

  //update จอ wait-drug
  socket.on("drg", async function(q) {
    console.log(`drg from ${ip}`, q);
    await io.emit("drg", "drg msg");
    await io.emit("blink", q);
  });

  //update จอ wait-lab
  socket.on("lab", async function(q) {
    console.log(`lab from ${ip}`, q);
    await io.emit("lab", "lab msg");
    await io.emit("blink", q);
  });

  //update จอ wait-aray
  socket.on("xry", async function(q) {
    console.log(`xry from ${ip}`, q);
    await io.emit("xry", "xry msg");
    await io.emit("blink", q);
  });

  //update จอ wait-err
  socket.on("err", async function(q) {
    console.log(`err from ${ip}`, q);
    await io.emit("err", "err msg");
    await io.emit("blink", q);
  });

  //update จอ wait-front-nurse
  socket.on("fnt", async function(q) {
    console.log(`fnt from ${ip}`, q);
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
