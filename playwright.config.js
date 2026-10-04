// @ts-check
const {devices} = require('@playwright/test');
const { trace } = require('node:console');

const config =({
  testDir: './tests',
  retries:2,
  timeout: 30*1000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
  use:{
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    browserName: 'chromium',
    
    headless: true,
    screenshot:'on',
    //trace:'on',
    trace:'on',
  },
  
});
module.exports = config

