# Algolia Index Update

A command-line utility for web sites using Algolia (for site indexing and search) to merge an updated index with an Algolia project data source. The module is based on the process outlined in [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify) and uses the [Algolia-indexing](https://github.com/pixelastic/algolia-indexing) module as described in the article. 

In the article, @cfjedimaster shows how to use generate the Algolia index from an [Eleventy](https://www.11ty.dev/) site and use [Netlify](https://www.netlify.com/) Functions to merge the updated index and upload it to Algolia during a Netlify build process. In the article he also mentioned a 10 minute limit for executing Cloud Functions in Netlify, and that scared me a little bit. Since I'm comfortable using a local generation and deployment process for my site's Algolia index, I decided to build this command-line module to handle the task for me.

![The module in action](https://github.com/johnwargo/algolia-index-update/blob/main/images/image-02.png)

Here's a link to the NPM project:

**Note:** You don't have to use Eleventy to use this module, all it cares about is local access to an Algolia site index and the Algolia project and account API keys needed to merge the local index with the Algolia project data source.

To use the module,  you must have:

* An Algolia Application project and data source  defined in Algolia. 
* The Algolia Application ID for your site's Algolia project.
* The Admin API keys for your Algolia account.
* The name of the Algolia project's index.

## Installation 

To install the module as a dependency in the application project, open a terminal window or command prompt and execute the following command:

```shell
npm install algolia-index-update --save-dev 
```

This adds an `algolia-idxup` command you can execute through the standard `npm run` build process at the command-line or in the project's `package.json` file.

To install the module globally, open a terminal window or command prompt and execute the following command:

```shell
npm install algolia-index-update -g
```

This adds an `algolia-idxup` command you can execute from any terminal window or command prompt on the system. 

## Usage

To use the module, you must first define the environment variables listed in the following table:

| Environment Variable Name | Algolia Project Key or Value   |
| ------------------------- | ------------------------------ |
| `ALGOLIA_API_KEY`         | Algolia account Admin API key  |
| `ALGOLIA_APP_ID`          | Algolia project Application ID |
| `ALGOLIA_IDX_NAME`        | Algolia project Index name     |

The module reads these environment variables and uses their values when merging the updated index with the Algolia cloud project. It uses environment variables to enable hiding the values from the project's source code in GitHub (or some other source code repository) and allows the module to run in cloud hosting environments like Netlify.

There are two options for executing the module:

```shell
algolia-idxup --default
```

and

```shell
algolia-idxup <path_to_the_algolia_index>
```

The first option looks for the Algolia index file at the default location for an Eleventy project: `_site/_data`

The second option allows you to pass the relative path of the index file. For example, if the index file was called `siteidx.json` and it was located in the local `data` folder, then you would execute the command using:

```shell
algolia-idxup data/siteidx.json
```

The module first validates the required environment variables, then confirms that it can locate the index file. With those two components in place, the module clicks and whirs for a while as it completes the index update/merge as shown below.

```text
D:\dev\11ty\random-errors-static>algolia-idxup --default
┌──────────────────────────┐
│                          │
│   Algolia Index Update   │
│                          │
└──────────────────────────┘
Index: : D:\dev\node\algolia-index-update\_site\algolia.json
Processing index for 17 articles.
√ Copying random-errors-main to random-errors-main_tmp
√ Updating settings of random-errors-main_tmp
√ Getting all records from random-errors-main_tmp
√ Moving random-errors-main_tmp to random-errors-main
√ Configuring replicas of random-errors-main
Processing completed in 43.687 seconds

D:\dev\node\algolia-index-update>
```

That's pretty much it. Enjoy!

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com). Learn about all of my publications at [John Wargo Books](http://www.johnwargobooks.com).

If you find this code useful and feel like thanking me for providing it, please consider <a *href*="https://www.buymeacoffee.com/johnwargo" *target*="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
