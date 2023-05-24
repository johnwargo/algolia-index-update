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
import indexing from 'algolia-indexing';
import boxen from 'boxen';
import chalk from 'chalk';
import dayjs from 'dayjs';
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
    .option('-f, --file <filePath>', 'Enable file-based credentials (with path to file)')
    .action(async (sourcePath, variablePrefix) => {
    console.log();
    const options = program.opts();
    const debugMode = options.debug;
    if (debugMode) {
        console.log('Debug mode enabled.');
        writeConsole(yellow, 'Source Path', sourcePath);
        if (variablePrefix != '')
            writeConsole(yellow, 'Variable prefix', variablePrefix);
        if (options.file) {
            writeConsole(yellow, 'File path', options.file);
        }
    }
    inputFilePath = path.join(process.cwd(), sourcePath);
    writeConsole(yellow, 'Index path', inputFilePath);
    if (variablePrefix != '') {
        algoliaApiKeyStr = variablePrefix + algoliaApiKeyStr;
        algoliaAppIdKeyStr = variablePrefix + algoliaAppIdKeyStr;
        algoliaIndexNameStr = variablePrefix + algoliaIndexNameStr;
    }
    else {
        if (debugMode)
            writeConsole(yellow, 'Info', 'Using root environment variables.');
    }
    const algoliaCreds = { appId: '', apiKey: '', indexName: '' };
    if (options.file) {
        writeConsole(yellow, 'Info', 'Using file-based credentials.');
        let filePath = path.join(process.cwd(), options.file);
        if (!fs.existsSync(filePath)) {
            writeConsole(red, 'Error', 'Credentials file does not exist, please try again');
            process.exit(1);
        }
        let rawData = fs.readFileSync(filePath);
        let fileData = JSON.parse(rawData.toString());
        algoliaCreds.appId = fileData[algoliaAppIdKeyStr];
        algoliaCreds.apiKey = fileData[algoliaApiKeyStr];
        algoliaCreds.indexName = fileData[algoliaIndexNameStr];
    }
    else {
        writeConsole(yellow, 'Info', 'Using environment-based credentials.');
        algoliaCreds.appId = process.env[algoliaAppIdKeyStr];
        algoliaCreds.apiKey = process.env[algoliaApiKeyStr];
        algoliaCreds.indexName = process.env[algoliaIndexNameStr];
    }
    ;
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
    console.log(`Processing index for ${idxData.length} articles.`);
    let startTime = dayjs(Date.now());
    indexing.verbose();
    try {
    }
    catch (err) {
        writeConsole(red, 'Error', err.message);
        process.exit(1);
    }
    ;
    let diffStr = commaize(Math.abs(startTime.diff(dayjs(Date.now()), 'second', true)));
    console.log(`Processing completed in ${diffStr} seconds`);
});
program.parse();
