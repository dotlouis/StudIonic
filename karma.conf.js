// Karma configuration
// Generated on Wed Oct 08 2014 11:14:25 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // Librairies required. Loaded in order
        'www/lib/parse-js-sdk/lib/parse.js',
        'www/lib/angular/angular.js',
        'www/lib/angular-animate/angular-animate.js',
        'www/lib/angular-sanitize/angular-sanitize.js',
        'www/lib/angular-ui-router/release/angular-ui-router.js',
        'www/lib/angular-mocks/angular-mocks.js',
        'www/lib/ionic/js/ionic-angular.js',
        'www/lib/ionic/js/ionic.js',
        'www/lib/ngCordova/dist/ng-cordova.js',
        'www/lib/ngCordova/dist/ng-cordova-mocks.js',

        // Needed to instandiate each modules first
        'www/js/controllers/bootstrap.js/',
        'www/js/factories/bootstrap.js',
        'www/js/directives/bootstrap.js',

        // code of modules loaded afterwards
        'www/js/**/*.js',

        // tests
        'test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'www/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,




    // karma-coverage
    coverageReporter: {
        reporters:[
            {type: 'html', dir:'test/coverage/'},
            {type: 'text-summary'}
        ],
    },

    // karma-cordova-launcher
    cordovaSettings: {
      platforms: ['android'],
      plugins: [
        'org.apache.cordova.console'
      ]
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Chrome'
        // 'PhantomJS'
        // 'Cordova'
    ],

    // autoWatch=true implies singleRun=false for the process not to quit and continuously watching file changes
    // autoWatch=false implies singleRun=true for karma to report anything

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
