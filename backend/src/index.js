const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//DataBase
mongoose.connect("mongodb+srv://user:password@nodeapi-n5tjo.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use(routes);

//Port
server.listen(3333);
