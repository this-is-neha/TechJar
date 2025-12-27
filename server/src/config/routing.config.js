// routing.config.js
const express = require("express");
const mainRoute = express.Router();
const listRoute=require("../modules/Todo/todo.router")

mainRoute.get("/", (req, res) => {
    console.log("Welcome to the main route");

});

mainRoute.use("/list",listRoute)



module.exports = mainRoute;
