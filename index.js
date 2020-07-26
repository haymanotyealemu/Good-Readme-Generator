const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
      },
      {
      type: "input",
      message: "Enter a description of your project",
      name: "description"
      },
      {
      type: "input",
      message: "Enter any installation instructions",
      name: "installation"
      },
      {
      type: "input",
      message: "Enter usage information",
      name: "usage"
      },
      {
      type: "checkbox",
      name: "license",
      choices: ["MIT License",
                "GPL License","Public Domain (Unlicense)"
              ]
      },
      {
      type: "input",
      message: "Enter contribution guidelines",
      name: "contribution"  
      },
      {
      type: "input",
      message: "Enter test instructions",
      name: "test"  
      },
      {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"  
      },
      {
        type: "input",
        message: "Enter the url of your profile picture",
        name: "profile"  
      },
      {
        type: "input",
        message: "Enter your Email address",
        name: "email"  
      }
  ]);
}
function generateREADME(answers) {
return`# ${answers.title}
![License](https://img.shields.io/badge/License-${answers.license}-blue.svg)
## Description
${answers.description}
## Table of Contents (Optional)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
## Installation
${answers.installation}
## Usage
${answers.usage}
## Credits
## License
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
## Badges
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
## Contributing 
${answers.contribution}
## Tests
${answers.test}
## Questions
![image of me](https://avatars2.githubusercontent.com/u/43423292?s=460&u=26cb426de077fa987aa3198e029a68dfe04424c1&v=4)
[${answers.email}](#email)
`
;
}
promptUser()
  .then(function(answers) {
    const readme = generateREADME(answers);
    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });