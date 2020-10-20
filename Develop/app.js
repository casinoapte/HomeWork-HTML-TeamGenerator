const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamMembers = []
var idArray = []

function makeTeam() {
    function employeeType() {
        inquirer.prompt([
            {
                type: "list",
                name: "empType",
                message: "Would you like to add an employee?",
                choices: ["Manager", "Engineer", "Intern", "No more members added"],
            },
        ])
            .then((response) => {
                switch (response.empType) {
                    case "Manager":
                        managerQuestions()
                        break
                    case "Engineer":
                        engineerQuestions()
                        break
                    case "Intern":
                        internQuestions()
                        break
                    default:
                        buildTeam()
                }
            })
    }

    // MANAGER QUESTIONS

    function managerQuestions() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the project manager?",
                name: "managerName",
            },
            {
                type: "input",
                message: "What is the ID of the project manager?",
                name: "managerId",
            },
            {
                type: "input",
                message: "What office number are they in?",
                name: "managerOffice"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "managerEmail"
            },
        ]).then(response => {
            const manager = new Manager(response.managerName, response.managerId, response.managerOffice, response.managerEmail)
            teamMembers.push(manager)
            idArray.push(response.managerId)
            employeeType()
        })
    }

    // ENGINEER QUESTIONS

    function engineerQuestions() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the engineer?",
                name: "engineer-name",
                // validate: answer => {
                //     if (!answer === "" || !answer === )
                // }
            },
            {
                type: "input",
                message: "What is the ID of the engineer?",
                name: "engineer-id",
            },
            {
                type: "input",
                message: "What is their GitHub username?",
                name: "engineer-github"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "engineer-email"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: ["Yes", "No"],
                name: "addMore"
            }
        ]).then(response => {
            employeeType()
        })
    }

    // INTERN QUESTIONS

    function internQuestions() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the intern?",
                name: "intern-name",
            },
            {
                type: "input",
                message: "What is the ID of the intern?",
                name: "intern-id",
            },
            {
                type: "input",
                message: "What school do they go to?",
                name: "intern-school"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "intern-email"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: ["Yes", "No"],
                name: "addMore"
            }
        ]).then(response => {
            employeeType()
        })
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }
    employeeType();
}
makeTeam()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
