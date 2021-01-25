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
const { type } = require("os");


// and to create objects for each team member (using the correct classes as blueprints!)
const employeeInformation = [
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
                console.log('\nInvalid Id')
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the employee\'s email?',
        //Riferance: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        validate: function ValidateEmail(email) {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                return true
            }
            console.log("\nYou have entered an invalid email address!")
            return false
        }
    },

    {
        type: 'list',
        name: 'employeeType',
        message: 'What is the employee type?',
        choices: ['Manager', 'Engineer', 'Intern']
    }
]
const engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s github username?'
    }
]

const InternQuestions = [
    {
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s school?',

    }
]
const managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the manager\'s officeNumber?',
        validate: (officeNumber) => {
            var invalid = isNaN(officeNumber)
            if (invalid) {
                console.log('\nInvalid officeNumber')
                return false
            } else {
                return true
            }
        }
    }

]

const moreEmployeeQuestion = [
    {

        type: 'confirem',
        name: 'more',
        message: 'press YES to add more employees!, or press ENTER to end!'
    }
]
// console.log(employeeInformation)
var renderQuestions = async () => {
    try {
        const myEmployees = []
        var addEmployees = true;
        // var addEmployees = moreEmployeeQuestion.choices[0]

        while (addEmployees) {
            // wait the results
            const employeeAnswers = await inquirer.prompt(employeeInformation);

            // for spesific questions

            switch (employeeAnswers.employeeType) {
                case 'Manager': {
                    const managerAnswers = await inquirer.prompt(managerQuestions);
                    employeeAnswers.thisAnswers = managerAnswers;
                    break;
                }
                case 'Intern': {
                    const internAnswers = await inquirer.prompt(InternQuestions);
                    employeeAnswers.thisAnswers = internAnswers;
                    break;
                }
                case 'Engineer': {
                    const engineerAnswers = await inquirer.prompt(engineerQuestions);
                    employeeAnswers.thisAnswers = engineerAnswers;
                    break;
                }
            }
            myEmployees.push(employeeAnswers);
            const moreEmployeesObject = await inquirer.prompt(moreEmployeeQuestion);
            addEmployees = moreEmployeesObject.more;
        }

        const totalEmployees = [];
        // for each employee in my employee list
        myEmployees.forEach(employee => {
            const name = employee.name;
            const id = employee.id;
            const email = employee.email;
            const employeeType = employee.employeeType;

            //employee type additional information
            switch (employeeType) {
                case 'Manager': {
                    const officeNumber = employee.thisAnswers.officeNumber;
                    const manager = new Manager(name, id, email, officeNumber);
                    totalEmployees.push(manager);
                    break;
                }
                case 'Intern': {
                    const school = employee.thisAnswers.school;
                    const intern = new Intern(name, id, email, school);
                    totalEmployees.push(intern);
                    break;
                }
                case 'Engineer': {
                    const github = employee.thisAnswers.github;
                    const engineer = new Engineer(name, id, email, github);
                    totalEmployees.push(engineer);
                    break;
                }
            }

        })
        return (totalEmployees);
    }

    catch (err) {
        // if error, return the error
        console.log(err)

    }
}

//generate team html template based on for every employee
var renderHTMLTemplate = async () => {
    const totalEmployees = await renderQuestions();
    const outputHTML = await render(totalEmployees);
    fs.writeFile(outputPath, outputHTML, err => {
        if (err) {
            return console.log(err);
        } else {
            console.log('Compled wrote the team.html file!');
        }
    })
}
//
renderHTMLTemplate();
