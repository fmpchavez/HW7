let fs = require("fs");
let inquirer = require("inquirer");
let api = require('./api.js');
const chalk = require("chalk");
const emoji = require("emoji");
let axios = require("axios");
// console.log(api)
const questions = [
        {
          type: "input",
          name: "username",
          message: "👤 " + chalk.bgRed("What is your github username?")
        },
        {
            type: "input",
            name: "projectName",
            message: "🗳 " + chalk.bgRed("What is your project's name?")
        },
        {
            type: "input",
            name: "description",
            message: "🗒 " + chalk.bgRed("Please write a short description about your project.")
        },
        {
          type: "list",
          message: "💳 " + chalk.bgRed("What kind of license should your project have?"),
          name: "license",
          choices: [
            "MIT", 
            "APACHE 2.0", 
            "GPL 3.0", 
            "BSD 3",
            "None"
          ]
        },
        {
            type: "checkbox",
            message: "🙊 " + chalk.bgRed("What languages are needed in this repo?"),
            name: "stack",
            choices: [
                "JavaScript", 
                "Mangose", 
                "Express", 
                "React",
                "Node",
                "MySQL"
            ]
        },
        {
            type: "input",
            name: "test",
            message: "🏃‍♂️  " + chalk.bgRed("What command should be run to run tests?")
        },
        {
            type: "input",
            name: "install",
            message: "🧩 " + chalk.bgRed("What command should be run to install dependencies?")
        },
        {
            type: "input",
            name: "repo",
            message: "📚 " + chalk.bgRed("What does the user need to know about using the repo?")
        },
        {
            type: "input",
            name: "contribute",
            message: "💬 " + chalk.bgRed("What does the user need to know about contributing to the repo?")
        }
    ]

    
function writeToFile(fileName, data) {
    
}
    
function init() {
    inquirer
        .prompt(questions)
        .then (response => {
            // console.log(response)
            let appendToFile = ""
            appendToFile += `<h1 style="text-align:center"> ${'👋'} Welcome to your project! </h1>\n \n`
            appendToFile += `# ${"💻"} Demo \n \n 
            <img src="demo.gif">\n \n`;
            appendToFile += `# ${'🗳'} PROJECT NAME: ${response.projectName} \n \n`;
            appendToFile += `## ${"🗒"} Project Description \n \n ${response.description}\n \n`;
            appendToFile += `## ${'✨'} TABLE OF CONTENTS \n
            1. Usage\n
            2. Languages\n
            3. License\n
            4. Contribution\n
            5. Installation\n
            6. Test\n 
            \n`
            appendToFile += `## ${'📚'} Usage \n \n ${response.repo}\n \n`;
            appendToFile += `## ${'🙊'} Languages Needed \n \n ${response.stack}\n \n`;
            appendToFile += `## ${'💳'} License \n \n This project is under the ${response.license} license\n \n`;
            appendToFile += `## ${'💬'} Contribution \n \n ${response.contribute}\n \n`;
            appendToFile += `## ${'🧩'} Installation \n \n To install the necessary dependencies, run the following command:\n
            ${response.install} \n \n`;
            appendToFile += `## ${'🏃‍♂️'} Test \n \n To run the test, use the following command: \n ${response.test} \n \n`;
    
            api.getUser(response.username).then(res=>{
                appendToFile += `## ${'🙌👏'}This project exists thanks to this person who contributed. \n
                <img src=${res.data.avatar_url}></img> \n`
                // console.log(res.data)
                
                fs.writeFile('README.md', appendToFile, (err) => {
                    // console.log(appendToFile)
                    if (err) throw err;  
                    console.log('The file has been saved!');
                });
            })

        })
}

init();
