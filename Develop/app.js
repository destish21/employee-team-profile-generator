const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// general questions for every employee
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the employee name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the employee\'s id number?',
        validate: (id) => {
            var invalid = isNaN(id)
            if (invalid) {
                console.log('invalid id')
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the employee\'s email adress(example@wtz.xyz)?',
        validate: function ValidateEmail(email) {
            // email validation refereence:  https://www.w3resource.com/javascript/form/email-validation.php
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value)) {
                return (true)
            }
            console.log("You have entered an invalid email address!")
            return (false)
        }
    },

    {
        type: 'list',
        name: 'employeeType',
        message: 'What is the employee type?',
        Choice: ['Manager', 'Engineer', 'Intern']
    }
]
// specific questions for engineers only
const engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s github username?'
    }
]
// specific questions for interns only
const InternQuestions = [
    {
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s school?'
    }
]
// specific questions for managers only
const managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the manager\'s officeNumber?',
        validet: (officeNumber) => {
            var invalid = isNaN(officeNumber)
            if (invalid) {
                console.log('invalid officeNumber')
                return false
            } else {
                return true
            }
        }
    }

]
// Question asking the user if there is a need to add more employee data
const moreQuestions = [
    {
        type: 'confirem',
        name: 'more',
        message: 'Do you want add more employees?',
    }
]
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
async function renderInfo() {
    try {



    } catch {

    }
}


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
