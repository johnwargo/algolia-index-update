#!/usr/bin/env node
var HighlightType;
(function (HighlightType) {
    HighlightType[HighlightType["Red"] = 0] = "Red";
    HighlightType[HighlightType["Yellow"] = 1] = "Yellow";
    HighlightType[HighlightType["Green"] = 2] = "Green";
})(HighlightType || (HighlightType = {}));
import fs from 'fs';
import path from 'path';
import indexing from 'algolia-indexing';
import boxen from 'boxen';
import chalk from 'chalk';
const red = HighlightType.Red;
const yellow = HighlightType.Yellow;
const green = HighlightType.Green;
const appName = 'Algolia Index Update';
const defaultFilePath = '_site/algolia.json';
const newline = "\n";
const algCredentials = {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_IDX_NAME
};
var inputFilePath;
function writeConsole(color, highlightText, msg) {
    if (color == HighlightType.Red)
        console.log(newline + chalk.red(`${highlightText}: `) + msg + newline);
    if (color == HighlightType.Yellow)
        console.log(chalk.yellow(`${highlightText}: `) + msg);
    if (color == HighlightType.Green)
        console.log(chalk.green(`${highlightText}: `) + msg);
}
console.log(boxen(appName, { padding: 1 }));
console.dir(algCredentials);
const pathObj = path.parse(process.argv[0]);
var commandArg = pathObj.name == 'node' ? process.argv[2] : process.argv[1];
if (commandArg == undefined) {
    writeConsole(red, 'Error', 'Module requires at least one argument, `--default` or the input file path.');
    process.exit(1);
}
let tmpFilePath = commandArg == '--default' ? defaultFilePath : commandArg;
inputFilePath = path.join(process.cwd(), tmpFilePath);
writeConsole(yellow, 'Algolia Index', inputFilePath);
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
console.log(`Processing ${idxData.length} articles.`);
indexing.verbose();
