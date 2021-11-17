import socketIOClient from "socket.io-client";

export const socket = socketIOClient.connect(
  "https://mst-full-stack-dev-test.herokuapp.com/",
  { transports: ["websocket"] }
);
