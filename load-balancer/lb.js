const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

const monitor = require("../health-monitor/monitor");

let index = 0;

function getServer() {
  let available = monitor.servers.filter(s => s.alive);

  if (available.length === 0) return null;

  let leastServer = available.reduce((prev, curr) =>
    (prev.connections || 0) <= (curr.connections || 0) ? prev : curr
  );

  index++;

  return leastServer;
}

module.exports = (req, res) => {
  const server = getServer();

  if (!server) {
    return res.status(503).send("❌ No backend available");
  }

  server.connections = (server.connections || 0) + 1;

  proxy.web(req, res, { target: server.url });

  res.on("finish", () => {
    server.connections--;
  });
};