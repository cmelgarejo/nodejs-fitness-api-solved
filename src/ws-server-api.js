const WebSocketServer = require("ws").Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.

  const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

  wss.on("connection", async function connection(ws) {
    console.log("connected!");
    ws.on("message", async function incoming(message) {
      var jsonObj = JSON.parse(message);
      await stepService.add(
        jsonObj.username,
        parseInt(jsonObj.ts),
        jsonObj.newSteps
      );
      console.log("updated:", await stepService.get(jsonObj.username));
      ws.send("success!");
    });
  });

  return wss;
};
