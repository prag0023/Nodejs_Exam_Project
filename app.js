const express = require("express");
const app = express();


app.get("/", (req,res) => {
    res.send("hello peoplw");
});

const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("The server is running on", server.address().port);
});