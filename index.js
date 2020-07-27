const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require('path');

async function init(){
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
    message: "Enter your email address",
    name: "email"  
  },
  {
    type: "input",
    message: "Enter any credits ",
    name: "credits"  
  }
]);
//Here we will call Github api
const gitUsername = userResponse.username;
const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
const gitData = gitResponse.data;
const gitName = gitData.name;
const gitEmail = gitData.email;
const gitlocation = gitData.location;
const gitUrl = gitData.html_url;
const gitProfileImage = gitData.avatar_url;

var result = (`
# **${userResponse.title}**
![Licence](https://img.shields.io/badge/License-${userResponse.licenseName}-blue.svg)
## Description
${userResponse.description}
## Table of Contents (Optional)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
## Installation

    ${userResponse.installation}

## Usage
![Screenshoot](${userResponse.usage})
${userResponse.usage}
## Credits
*<${userResponse.credits}>
## License
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Licence](https://img.shields.io/badge/License-${userResponse.licenseName}-blue.svg)
## Badges
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
## Contributing 
${userResponse.contribution}
## Tests
${userResponse.test}
## Questions
Please contact the author for any questions
## Author Details 
${gitName}
\n[GitHub Profile](${gitUrl})
\n![ProfileImage](${gitProfileImage})
\nEmail: <${userResponse.email}>
`)
var writeResult = fs.writeFileSync(path.join(__dirname,'../Good-Readme-Generator','README.md'),result)
console.log("file generated");
}
init();


