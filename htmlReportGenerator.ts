const reporter = require("cucumber-html-reporter");
var date = new Date();

var currentDate = date.getDate() + (date.getMonth() + 1) + date.getFullYear() + " " +
    date.getHours() + date.getMinutes() + date.getSeconds() + " " + date.getMilliseconds();

    var options = {
        brandTitle: "Example of the Cucumber with Playwright on TypeScript",
        theme: "bootstrap",
        jsonFile: 'Reports/cucumber_report.json',
        output: 'Reports/cucumber_report_' + currentDate + '.html',
        screenshotsDirecory: './Screenshots',
        storeScreenshots: true,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version": "0.0.1",
            "Test Environment": "localhost",
            "Platworm": "Cross"
        }
    }

    reporter.generate(options);