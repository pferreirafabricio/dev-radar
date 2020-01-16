const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

//DataBase
mongoose.connect("mongodb+srv://fabricio:fabreco@nodeapi-n5tjo.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Middlewares
app.use(express.json());

//Routes
app.use(routes);

//Port
app.listen(3333);
