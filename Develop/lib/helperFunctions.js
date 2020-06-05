const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");

function promptManager ()
{
    const answers = inquirer.prompt([
        {
            message: "What is the name of the Team Manager?",
            name: "name"
        },
        {
            message: "What is the Team Manager's email address?",
            name: "email"
        }, {
            message: "What is Team Manager's office number ?",
            name: "officeNumber"
        },
    ]);
    return answers;
}
function promptEmployeeInfo ()
{
    const answers = inquirer.prompt([
        {
            message: "Enter the full name of an employee",
            name: "name"
        },
        {
            message: "What is the employee's email address",
            name: "email"
        },
        {
            type: "list",
            message: "Choose their role:",
            name: "role",
            choices: ["Engineer", "Intern"]
        },

        {
            message: "What is the Github Username of the employee?",
            name: "GithubUser",
            when: (answers) =>
            {
                if (answers.role === "Engineer") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            message: " What school does the Intern attend?",
            name: "school",
            when: (answers) =>
            {
                if (answers.role === "Intern") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: "confirm",
            message: "Do you have another employee to enter?",
            name: "addEmployee"
        }
    ]);
    return answers;
}
async function buildTeam(){
    let staffArray = [];
    let id = 1;
    const mgrInfo = await promptManager();
    const manager = new Manager(mgrInfo.name, id++, mgrInfo.email, mgrInfo.officeNumber);
    staffArray.push(manager);

    while (true) {
        const empInfo = await promptEmployeeInfo();
        if (empInfo.role === "Engineer"){
            const engineer = new Engineer (empInfo.name, id++, empInfo.email, empInfo.GithubUser);
            staffArray.push(engineer);
        }
        if (empInfo.role === "Intern"){
            const intern = new Intern (empInfo.name, id++, empInfo.email, empInfo.school);
            staffArray.push(intern);
        }
        if (empInfo.addEmployee === false) {
            break;
        }
    }
    return staffArray;
}

module.exports.buildTeam = buildTeam;
module.exports.promptEmployeeInfo = promptEmployeeInfo;
module.exports.promptManager = promptManager;