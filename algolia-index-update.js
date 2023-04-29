#!/usr/bin/env node
var HighlightType;
(function (HighlightType) {
    HighlightType[HighlightType["Red"] = 0] = "Red";
    HighlightType[HighlightType["Yellow"] = 1] = "Yellow";
    HighlightType[HighlightType["Green"] = 2] = "Green";
})(HighlightType || (HighlightType = {}));
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import boxen from 'boxen';
import chalk from 'chalk';
const red = HighlightType.Red;
const yellow = HighlightType.Yellow;
const green = HighlightType.Green;
const appName = 'Algolia Index Update';
const newline = "\n";
var algoliaAppIdKeyStr = 'ALGOLIA_APP_ID';
var algoliaApiKeyStr = 'ALGOLIA_API_KEY';
var algoliaIndexNameStr = 'ALGOLIA_IDX_NAME';
var inputFilePath;
function commaize(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function writeConsole(color, highlightText, msg) {
    if (color == HighlightType.Red)
        console.log(newline + chalk.red(`${highlightText}: `) + msg + newline);
    if (color == HighlightType.Yellow)
        console.log(chalk.yellow(`${highlightText}: `) + msg);
    if (color == HighlightType.Green)
        console.log(chalk.green(`${highlightText}: `) + msg);
}
console.log(boxen(appName, { padding: 1 }));
const program = new Command();
program
    .argument('<sourcePath>', 'Relative path for the source index file')
    .argument('[variablePrefix]', 'Environment variable prefix', '')
    .option('-d, --debug', 'Debug mode')
    .action(async (sourcePath, variablePrefix) => {
    console.log();
    const options = program.opts();
    const debugMode = options.debug;
    if (debugMode) {
        console.log('Debug mode enabled.');
        writeConsole(yellow, 'Source Path', sourcePath);
        writeConsole(yellow, 'Variable prefix', variablePrefix);
    }
    inputFilePath = path.join(process.cwd(), sourcePath);
    writeConsole(yellow, 'Index path', inputFilePath);
    if (variablePrefix != '') {
        algoliaApiKeyStr = variablePrefix + algoliaApiKeyStr;
        algoliaAppIdKeyStr = variablePrefix + algoliaAppIdKeyStr;
        algoliaIndexNameStr = variablePrefix + algoliaIndexNameStr;
    }
    else {
        writeConsole(yellow, 'Info', 'Using root environment variables.');
    }
    const algoliaCreds = {
        appId: process.env[algoliaApiKeyStr],
        apiKey: process.env[algoliaAppIdKeyStr],
        indexName: process.env[algoliaIndexNameStr]
    };
    if (debugMode)
        console.dir(algoliaCreds);
    let validConfig = true;
    if (algoliaCreds.appId == undefined)
        validConfig = false;
    if (algoliaCreds.apiKey == undefined)
        validConfig = false;
    if (algoliaCreds.indexName == undefined)
        validConfig = false;
    if (!validConfig) {
        writeConsole(red, 'Error', 'One or more Algolia credentials environment variables missing.');
        process.exit(1);
    }
    try {
        if (!fs.existsSync(inputFilePath)) {
            writeConsole(red, 'Error', 'Algolia index file does not exist, please try again');
            process.exit(1);
        }
    }
    catch (err) {
        writeConsole(red, 'Error', err.message);
        process.exit(1);
    }
    let rawData = fs.readFileSync(inputFilePath);
    let idxData = JSON.parse(rawData.toString());
});
program.parse();
