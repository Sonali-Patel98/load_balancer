const axios = require("axios");

let servers = [
  { url: "http://localhost:3001", alive: true },
  { url: "http://localhost:3002", alive: true }
];

async function checkHealth() {
  for (let server of servers) {
    try {
      await axios.get(server.url + "/health");
      server.alive = true;
      console.log("✅ " + server.url + " is UP");
    } catch {
      server.alive = false;
      console.log("❌ " + server.url + " is DOWN");
    }
  }
}

setInterval(checkHealth, 5000);

module.exports = {servers};





