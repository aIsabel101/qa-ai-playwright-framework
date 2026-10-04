// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('node:console');
const { permission } = require('node:process');

const config = ({
  testDir: './tests',
  //retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        
        screenshot: 'off',
        trace: 'on',
        ...devices['iphone 11'],
      }

    },
     {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video:'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        trace: 'on',
        //...devices['iPhone 11'],
       // viewport:{width:720, height:720}
      }

    },

  ],


});
module.exports = config

