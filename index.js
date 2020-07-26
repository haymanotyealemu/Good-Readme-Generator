const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const generate = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);
const questions = [
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
      message: "Enter your Email address",
      name: "email"  
    }
];
inquirer.prompt(questions).then(function(data){
  const queryUrl = `https://api.github.com/users/${data.username}`;
  axios.get(queryUrl).then(function(res){
    const githubInfo = {
      githubImage: res.data.avatar_url,
      profile: res.data.html_url,
      name: res.data.name
  };
  return writeFileAsync("README.md", generate(data,githubInfo));
  });
}).then(function() {
  console.log("Successfully wrote to README.md");
})
.catch(function(err) {
  console.log(err);
});
  
