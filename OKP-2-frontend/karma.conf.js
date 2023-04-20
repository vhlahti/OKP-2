// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-junit-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: { },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    junitReporter: {
      outputDir: "testresults",
    },
    autoWatch: false,
    restartOnFileChange: false,
    reporters: ["junit"],
    customLaunchers: {
      HeadlessChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    browsers: ["HeadlessChrome"],
    browserDisconnectTimeout: 10000, // time (ms) to wait for the browser to disconnect
    browserDisconnectTolerance: 3, // number of retries before failing
    browserNoActivityTimeout: 60000, // time (ms) to wait for the browser to start the test run
    captureTimeout: 60000 // overall time (ms) to wait for the tests to complete
  });
};
