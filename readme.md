# Algolia Index Update

A command-line utility for web sites using Algolia (for site indexing and search) to merge an updated index with an Algolia project data source. The module is based on the process outlined in [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify). In the article, @cfjedimaster shows how to use generate the Algolia index from an [Eleventy](https://www.11ty.dev/) site and use [Netlify](https://www.netlify.com/) Functions to merge the updated index and upload it to Algolia during a Netlify build process. In the article he also mentioned a 10 minute limit for executing Cloud Functions in Netlify, and that scared me a little bit. Since I'm comfortable using a local generation and deployment process for my site's Algolia index, I decided to build this command-line module to handle the task for me.

Here's a link to the NPM project:

**Note:** You don't have to use Eleventy to use this module, all it cares about is local access to an Algolia site index and the Algolia project and account API keys needed to merge the local index with the Algolia project data source.

To use the module,  you must have:

* An Algolia Application project and data source set defined in Algolia. 
* The Algolia Application ID for your site's Algolia project.
* The Admin API keys for your Algolia account.
* The name of the Algolia project's index.



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
