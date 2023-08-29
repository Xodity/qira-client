const puppeteer = require('puppeteer');
const readline = require('readline');
const fs = require('fs');
const validate = require('./validate');
const framework = require('./framework');
const { HookAuth } = require("./framework");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFilePath = 'authentication_data.json';

(async () => {
    let userData = {};
    try {
        userData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    } catch (error) {
        console.log('Cookies Token not found in authentication json please login');
    }
    validate.clienrt(userData)
    userData.connectSid && userData.rememberMe ? await framework.HookAuth(userData,rl,dataFilePath,framework) : null ;
})();
