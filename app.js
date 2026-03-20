const express = require("express");
const app = express();
const loadBalancer = require("./load-balancer/lb");
const monitorServers = require("./health-monitor/monitor");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    servers: monitorServers.servers
  });
});

app.use("/api",(req, res) => {
  loadBalancer(req, res);
});

app.listen(3000, () => {
  console.log(" Load Balancer running on port 3000");
});