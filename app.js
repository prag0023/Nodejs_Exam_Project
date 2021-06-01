    const express = require("express");
    const mongoose = require("mongoose");
    const app = express();
    const fs = require("fs");

    const server = require("http").createServer(app);
    const io = require("socket.io")(server);

    const http = require('http');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(express.json());


    const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
    const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

    const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
    const register = fs.readFileSync(__dirname + "/public/register/register.html", "utf-8");
    const about = fs.readFileSync(__dirname + "/public/about/about.html", "utf-8");
    const courses = fs.readFileSync(__dirname + "/public/courses/courses.html", "utf-8");
    const socket = fs.readFileSync(__dirname + "/public/socket/socket.html", "utf-8");
    const student = fs.readFileSync(__dirname + "/public/student/student.html", "utf-8");
    const updateStudent = fs.readFileSync(__dirname + "/public/updateStudent/updateStudent.html", "utf-8");



    //-----------------MongoDB----------------------//
    mongoose.connect("mongodb://localhost:27017/SChasersDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const studentSchema = {
        firstName: String,
        lastName: String,
        address:String,
        city:String,
        zip: String,
        country: String,
        age: String,
        education:String,
        email: String,
        phone: String, 
        message: String
    };

    const Student = mongoose.model("Student", studentSchema);

    app.route("/students", (req, res) => {
        Student.find(function(err, foundStudents){
            if (!err) {
                res.send(foundStudents);
            }else {
                res.send(err);
            } 
        });
    })
    .delete((req, res) => {
        Student.deleteMany((err) => {
            if (!err) {
                res.send("Successfully deleted all students");
            }else {
                res.send(err);
            }
        })
    })
    .put(function(req, res){

        Article.update(
          {title: req.params.articleTitle},
          {title: req.body.title, content: req.body.content},
          {overwrite: true},
          function(err){
            if(!err){
              res.send("Successfully updated the selected article.");
            }
          }
        );
      })

      /* ------------------------ */
    
    app.post("/register", (req, res) => {
    const newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address:req.body.address,
        city: req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        age: req.body.age,
        education: req.body.education,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message 
    });

    newStudent.save((err) => {
        if (!err) {
            res.send("saved");
            
        }else {
            res.send(err);
        }
        //    res.redirect("/");
    });
    
    });

    





    //----------------------------------------------------------//






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

    app.get("/students", (req, res) => {
        res.send(header + student + footer)
    })

    app.get("/students/update", (req, res) => {
        res.send(header + updateStudent + footer);
    }) 

    app.get("/socket", (req, res) => {
        res.send(header + socket + footer);
    
    });

    io.on('connection' , (socket) => {
        socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        });
    });





    server.listen(8080, (error) => {
    if (error) {
        console.log(error);
    }
        console.log("Server is running on port", 8080);
    });



