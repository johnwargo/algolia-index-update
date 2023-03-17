# Algolia Index Update

Command-line utility for npm-based 

Algolia projects that merges a local index JSON file with an Algolia index in the cloud The module is based on the process outlined in [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify). 

Assumes you already have an algolia 
Here's a link to the NPM project:

## Installation 

To install the module as a dependency in the application project, open a terminal window or command prompt and execute the following command:

```shell
npm install algolia-index-update --save-dev 
```

This approach allows you to easily execute the module in the standard npm run build process.

To install the module globally, open a terminal window or command prompt and execute the following command:

```shell
npm install algolia-index-update -g
```

## Installation

With this approach, you can execute the module in a terminal window or command prompt from any folder on your development system.


Requires that you set three environment variables on the system running the module:

| Environment Variable | Algolia Project Key or Value |
| -------------------- | ---------------------------- |
| ALGOLIA_APP_ID       | Application ID               |
| ALGOLIA_API_KEY      | Admin API Key                | 
| ALGOLIA_IDX_NAME     | Index Name                   | 
