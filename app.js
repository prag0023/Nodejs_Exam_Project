    const express = require("express");
    const mongoose = require("mongoose");
    const fs = require("fs");


    const app = express();


    const server = require("http").createServer(app);
    const io = require("socket.io")(server);

    const http = require('http');

    app.use(express.urlencoded({
        extended: true
    }));
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
    const login = fs.readFileSync(__dirname + "/public/login/login.html", "utf-8");
    const adminRegister = fs.readFileSync(__dirname + "/public/adminRegister/adminRegister.html", "utf-8");



    //-----------------MongoDB USER----------------------//
    mongoose.connect("mongodb://localhost:27017/SChasersDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const userSchema = {
        email: String,
        password: String
    };


    const User = mongoose.model("User", userSchema);

    app.post('/adminregister', (req, res) => {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/about');
            }
        })
    });

    app.post('/adminlogin', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({
            email: username
        }, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.redirect('/students');
                    }
                }
            }
        });
    });

    //-----------------MongoDB Student-----------------//

    const studentSchema = {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        zip: String,
        country: String,
        email: String,
        phone: String,
        course: String
    };


    const Student = mongoose.model("Student", studentSchema);


    app.get('/students', (req, res) => {
        res.send(header + student + footer)
    })
    app.get("/students/update/:_id", function (req, res) {
        res.send(header + updateStudent + footer)
    })

    app.delete("/students", (req, res) => {
        Student.deleteMany((err) => {
            if (!err) {
                res.send("Successfully deleted all students");
            } else {
                res.send(err);
            }
        });
    });



    app.post("/register", (req, res) => {
        const newStudent = new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course
        });

        newStudent.save((err) => {
            if (!err) {

                res.send(header + frontpage + footer);

            } else {
                res.send(err);
            }
        });

    });

    app.get('/getStudents', function (req, res) {
        Student.find(function (err, foundStudents) {

            if (!err) {
                res.json(foundStudents)
            } else {
                res.send(err);
            }
        });
    })
    app.post('/getStudent', function (req, res) {

        Student.findOne({
            _id: req.body.id
        }, function (err, foundStudent) {
            if (foundStudent) {
                res.send(foundStudent)
            } else {
                res.send("No articles matching that title was found.");
            }
        })
    })

    app.post('/postStudentUpdate', function (req, res) {
        Student.findByIdAndUpdate(req.body.id, req.body, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/students')
            }
        })

    })
    app.post('/deleteStudent', function (req, res) {

        Student.deleteOne({
                _id: req.body.id
            },
            function (err) {
                if (!err) {
                    res.json({
                        success: "DELETED"
                    });
                } else {
                    res.send(err);
                }
            }
        );
    })

    //----------------------------------------------------------//


    app.get("/", (req, res) => {
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
    });

    app.get("/adminlogin", (req, res) => {
        res.send(header + login + footer)
    });

    app.get("/adminregister", (req, res) => {
        res.send(header + adminRegister + footer);
    })

    app.get("/socket", (req, res) => {
        res.send(header + socket);

    });

    io.on('connection', (socket) => {
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