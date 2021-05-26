const express = require("express");
const app = express();
const fs = require("fs");

const descriptionRouter = require("./routes/description.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(descriptionRouter.router);

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const register = fs.readFileSync(__dirname + "/public/register/register.html");
const about = fs.readFileSync(__dirname + "/public/about/about.html");
const courses = fs.readFileSync(__dirname + "/public/courses/courses.html")
const description = fs.readFileSync(__dirname + "/public/description/description.html");


app.get("/", (req,res) => {
    res.send(header + frontpage + footer);
});

app.get("/register", (req, res) => {
    res.send(header + register + footer);
});

app.get("/about", (req, res) => {
    res.send(header + about + footer);
});

app.get("/courses", (req, res) => {
    res.send(header + courses + footer);
});

app.get("/description", (req,res) => {
    res.send(header + description + footer);

});


const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("The server is running on", server.address().port);
});