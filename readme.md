# Algolia Index Update

Command-line utility for npm-based Algolia projects that merges a local index JSON file with an Algolia index in the cloud The module is based on the process outlined in [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify). 

Here's a link to the NPM project:


Requires that you set three environment variables on the system running the module:

| Environment Variable | Algolia Project Key or Value |
| -------------------- | ---------------------------- |
| ALGOLIA_APP_ID       | Application ID               |
| ALGOLIA_API_KEY      | Admin API Key                | 
| ALGOLIA_IDX_NAME     | Index Name                   | 
