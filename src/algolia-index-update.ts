#!/usr/bin/env node

// https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify

// =======================================================
// TODO: Get the input file path from the command line
// TODO: Use --default to set the default input file path
// TODO: Make sure the file exists
// TODO: use Ray's code to update the Algolia index
// =======================================================

enum HighlightType {
    Red, Yellow, Green
}

// node modules
import fs from 'fs';
import path from 'path';

// Third-party modules
import boxen from 'boxen';
import chalk from 'chalk';

// local constants
const red = HighlightType.Red;
const yellow = HighlightType.Yellow;
const green = HighlightType.Green;

const appName = 'Algolia Index Update';
const buildDate = new Date(Date.now());
const newline="\n";
const inputFileName = 'algolia.json';

var inputFolder;
var inputFilePath;

function writeConsole(color: HighlightType, highlightText: string, msg: string) {
    if (color == HighlightType.Red) console.log(newline + chalk.red(`${highlightText}: `) + msg + newline);
    if (color == HighlightType.Yellow) console.log(chalk.yellow(`${highlightText}: `) + msg);
    if (color == HighlightType.Green) console.log(chalk.green(`${highlightText}: `) + msg);
}

console.log(boxen(appName, { padding: 1 }));

writeConsole(HighlightType.Yellow, 'Input file', inputFile);
try {
    if (!fs.existsSync(inputFile)) {
        writeConsole(red, 'Error',
            'This is not a nodeJS project, cannot find `package.json` in this folder.');
        process.exit(1);
    }
} catch (err: any) {
    writeConsole(red, 'Error', err.message);
    process.exit(1);
}

// Check our command-line argument(s)
// parse the first argument
const pathObj: any = path.parse(process.argv[0]);
// is it node? Then we have three arguments, otherwise two
var tmpStr = pathObj.name == 'node'? process.argv[2]: process.argv[1];
if (tmpStr == undefined) {
    writeConsole(red, 'Error', 'Output folder not specified on command line');
    process.exit(1);
}

outputFolder = path.join(process.cwd(), tmpStr);
writeConsole(yellow, 'Output folder', outputFolder);

try {
    if (!fs.existsSync(outputFolder)) {
        writeConsole(red, 'Error', 'Output folder does not exist, please try again');
        process.exit(1);
    }
} catch (err: any) {
    writeConsole(red, 'Error', err.message);
    process.exit(1);
}

outputFile = path.join(outputFolder, outputFileName);
writeConsole(yellow, 'Output file', outputFile);

let rawData = fs.readFileSync(inputFile);
let packageDotJSON = JSON.parse(rawData.toString());

let buildVersion = packageDotJSON.version;
writeConsole(green, '\nBuild version', buildVersion);
writeConsole(green, 'Build date', `${buildDate.toString()} (${buildDate.getTime().toString()} in ms)`);

// javascript output
// let outputStr = 'export const buildInfo = {\n';
// outputStr += `  buildVersion: "${buildVersion}",\n`;
// outputStr += `  buildDate: ${buildDate.getTime()},\n`;
// outputStr += '}';

const buildInfo = {
    buildVersion: buildVersion,
    buildDateMs: buildDate.getTime(),
    buildDateStr: buildDate.toLocaleString()
};
let outputStr = JSON.stringify(buildInfo, null, 2);

try {
    fs.writeFileSync(outputFile, outputStr, 'utf8');
    writeConsole(green, 'Success', 'Output file written successfully\n');
} catch (err: any) {
    writeConsole(red, 'Error', 'Unable to write to file')
    console.dir(err);
}
