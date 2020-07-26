function generateMarkdown(data, githubInfo){
    return `
    # ${data.title}
    ##${data.badge}
    ## Description
    ${data.description}

    ## Table of Contents (Optional)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)

    ## Installation
    ${data.installation}

    ## Usage
    ${data.usage}
    ## Credits
    ## License
    [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
    ## Badges
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    ## Contributing
    ${data.contribution}
    ## Test
    ${data.test}
    ## Questions
    ![Image of me](${githubInfo.githubImage})
    [GitHub Profile](${githubInfo.profile})
    
    [email](${githubInfo.email})

    `;
}
module.exports = generateMarkdown;