var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

var path = require("path");

var port = process.env.PORT || 19009;

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "hos"
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.query("SET NAMES UTF8", err => {
        done(err, conn);
      });
    }
  }
});

app.use(cors());
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/web/index.html");
});

var client = require("socket.io-client")(`http://localhost:${port}`);
//client = {เครื่องเรียกคิว, broweser เรียกทดสอบส่งสัญญาณมาที่ server}

// screen
app.get("/sc1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("sc1", q);
  res.send(`sc1 ${q}`);
});

app.get("/sc2/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("sc2", q);
  res.send(`sc2 ${q}`);
});
app.get("/sc3/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("sc3", q);
  res.send(`sc3 ${q}`);
});
app.get("/sc4/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("sc4", q);
  res.send(`sc4 ${q}`);
});
app.get("/sc5/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("sc5", q);
  res.send(`sc5 ${q}`);
});
// end screen

//dx
app.get("/dx1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx1", q);
  res.send(`dx1 ${q}`);
});
app.get("/dx2/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx2", q);
  res.send(`dx2 ${q}`);
});
app.get("/dx3/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx3", q);
  res.send(`dx3 ${q}`);
});
app.get("/dx4/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx4", q);
  res.send(`dx4 ${q}`);
});
app.get("/dx5/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx5", q);
  res.send(`dx5 ${q}`);
});
app.get("/dx6/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx6", q);
  res.send(`dx6 ${q}`);
});
app.get("/dx7/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx7", q);
  res.send(`dx7 ${q}`);
});
app.get("/dx8/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx8", q);
  res.send(`dx8 ${q}`);
});
app.get("/dx9/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx9", q);
  res.send(`dx9 ${q}`);
});
app.get("/dx10/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("dx10", q);
  res.send(`dx10 ${q}`);
});

//end dx

//rx1-10
//rx

app.get("/rx/:q", async (req, res) => {
  let q = req.params.q;
  let sql = "select 2 as 'ch'";
  let raw = await knex.raw(sql,[q]);
  let ch = raw[0];
  await client.emit(`rx${ch}`, q);
  res.send(`rx${ch} ${q}`);
});

app.get("/rx1/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx1", q);
  res.send(`rx1 ${q}`);
});
app.get("/rx2/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx2", q);
  res.send(`rx2 ${q}`);
});
app.get("/rx3/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx3", q);
  res.send(`rx3 ${q}`);
});
app.get("/rx4/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx4", q);
  res.send(`rx4 ${q}`);
});
app.get("/rx5/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx5", q);
  res.send(`rx5 ${q}`);
});
app.get("/rx6/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx6", q);
  res.send(`rx6 ${q}`);
});
app.get("/rx7/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx7", q);
  res.send(`rx7 ${q}`);
});
app.get("/rx8/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx8", q);
  res.send(`rx8 ${q}`);
});
app.get("/rx9/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx9", q);
  res.send(`rx9 ${q}`);
});
app.get("/rx10/:q", async (req, res) => {
  let q = req.params.q;
  await client.emit("rx10", q);
  res.send(`rx10 ${q}`);
});
//end rx

// {ฝั่ง server กระจายสัญญาณ}
io.on("connection", function(socket) {
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

  //dx 1 - 10
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
  socket.on("dx10", async function(q) {
    await io.emit("dx10", q);
  });
  //end dx

  //rx 1 - 10
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
  socket.on("rx10", async function(q) {
    await io.emit("rx10", q);
  });
  // end rx
});

http.listen(port, function() {
  console.log("Power By SmartQueue (Utehn J.)");
  console.log("Queue Signal On Port:" + port);
});
