const router = require('express').Router();

const description = [
    
    {
        "courseTitle": "JAVA",
        "courseDescription": " A very famous programming language usaully used for designing mobile apps and desktop applications.",
        "courseType": "Programming language",
        "courseTech": {
            "technology1": "JDK",
            "technology2": "JRE",
            "technology3": "IDE (intellij, jgrasp) ",
            
        },
        "projectLanguages": {
            "language1": "Java",
            "language2": "MySql",
            "language3": "CSS",
            "language4": "HTML"
        },
        "projectStartDate": new Date("November 15, 2020"),
        "projectEndDate": new Date("December 18, 2020"),
        "projectGitLink": "https://github.com/DavidKrtolica/SocialMediaApp",
        
    },
    {
        "projectTitle": "Nordic Motorhome Rental",
        "projectDescription": "A motorhome rental app which has features creating space for new motorhome , updating the details of the customer, generating bills ,deleting the motorhome etc .",
        "projectType": "Exam Project",
        "projectTech": {
            "technology1": "Google Docs",
            "technology2": "MySQL Workbench",
            "technology3": "Visual Paradigm",
            "technology4": "IntelliJ"
        },
        "projectLanguages": {
            "language1": "Java",
            "language2": "MySQL",
            "language3": "CSS",
            "language4": "HTML"
        },
        "projectStartDate": new Date("July 2, 2020"),
        "projectEndDate": new Date("June 3, 2020"),
        "projectGitLink": "https://github.com/nirenrawal/NordicMotorhomeProject",
        
    },
    {
        "projectTitle": "Adventure XP",
        "projectDescription": " A system for fun, gym where one can choose the games they like and reserve seat including the feautres for updating and cancellation as well. ",
        "projectType": " Class Mandatory Project",
        "projectTech": {
            "technology1": "MySQL Workbench",
            "technology2": "Git",
            "technology3": "IntelliJ",
            "technology4": "Visual Paradigm",
            "technology5": "Google Docs"
        },
        "projectLanguages": {
            "language1": "Java",
            "language2": "MySQL",
            "language3": "HTML",
            "language4": "CSS"
        },
        "projectStartDate": new Date("October 20, 2020"),
        "projectEndDate": new Date("November 15, 2020"),
        "projectGitLink": "https://github.com/CristiPV/Black-Marlins-Adventure-XP-Project.git",
        
    },
    {
        "projectTitle": "Book-Store",
        "projectDescription": "A web shop where you can find varities of books of various categories, contains features like adding , updating deleting the books and also places the order and calculates it.  ",
        "projectType": " Exam Project",
        "projectTech": {
            "technology1": "MySQL Workbench",
            "technology2": "Git",
            "technology3": "IntelliJ",
            "technology4": "Visual Paradigm",
            "technology5": "Google Docs"
        },
        "projectLanguages": {
            "language1": "Java",
            "language2": "MySQL",
            "language3": "HTML",
            "language4": "CSS",
            "language5": "React"
        },
        "projectStartDate": new Date("October 20, 2020"),
        "projectEndDate": new Date(" December 15, 2020"),
        "projectGitLink": "https://github.com/nirenrawal/book_store.git",
        
    }
];

router.get("/api/description", (req, res) => {
    res.send({ description });
});

module.exports = {
    router
};
