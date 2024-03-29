const express = require("express");
const path = require("path");
const api = require("./bracket/bracketIndex");
const swiss = require("./swiss/swissIndex");
// const dashboard = require('./dashboard/dashboard');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "../client/dist");

app.use(express.json());
app.use(express.static(DIST_DIR));

app.use("/api", api);
// app.use('/dashboard', dashboard)
app.use("/swiss", swiss);

app.use("/", (req, res) => {
  console.log("refresh.");
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
