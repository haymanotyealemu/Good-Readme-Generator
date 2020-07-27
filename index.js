const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const path = require('path');
const generate = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);
async function main(){
  const userResponse = await inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
  },
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
    message: "Enter table of contents",
    name: "tableOfContents"
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
    type: "input",
    name: "licenseName",
    message: "Provide license name"
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
    message: "Any questions?",
    name: "questions"  
  }
]);
//Here we will call Github api
const gitUsername = userResponse.username;
const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
const gitData = gitResponse.data;
const gitName = gitData.login;
const gitEmail = gitData.email;
const gitlocation = gitData.location;
const gitUrl = gitData.html_url;
const gitProfileImage = gitData.avatar_url;

var result = (`
# **${userResponse.title}**
![Licence](https://img.shields.io/badge/License-${userResponse.licenseName}-blue.svg)
## Description
# ${userResponse.description}
## Table of Contents (Optional)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
# ${userResponse.tableOfContents}
## Installation
# ${userResponse.installation}
## Usage
# ${userResponse.usage}
## Credits
## License
![Licence](https://img.shields.io/badge/License-${userResponse.licenseName}-blue.svg)
# ${userResponse.licenseName}
## Badges
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
## Contributing 
# ${userResponse.contribution}
## Tests
# ${userResponse.test}
## Questions
# ${userResponse.questions}
# Author Details 
${gitName}
\n[GitHub Profile](${gitUrl})
\n![ProfileImage](${gitProfileImage})
\nEmail: ${gitEmail}
`)
var writeResult = fs.writeFileSync(path.join(__dirname,'../Good-Readme-Generator','README.md'),result)
console.log("file generated");
}
main();


