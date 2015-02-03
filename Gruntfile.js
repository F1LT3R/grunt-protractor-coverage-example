module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    express: {
      options: {
        port: 9000
      },
      cov: {
        options: {
          script: 'instrumented/src/file1.js',
          debug: true
        }
      },
    },
    open: {
      server: {
        url: 'http://localhost:9000'
      }
    },

  
    copy: {
      cov: {
        files: [{
          expand: true,
          dot: true,
          src: 'src/*.js',
          dest: 'instrumented',
        }]
      }
    },

    // start - code coverage settings
    instrument: {
      // files: ['src/*.js', 'app/scripts/**/*.js'],
      files: ['src/file1.js'],
      options: {
        lazy: false,
        basePath: 'instrumented'
      }
    },

    makeReport: {
      src: 'instrumented/*.json',
      options: {
        type: 'html',
        dir: 'reports/',
        print: 'detail'
        //        type: 'lcov',
        //        dir: 'reports',
        //        print: 'detail'
      }
    },


    protractor_coverage: {
      options: {
        configFile: 'protractorConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        coverageDir: 'instrumented',
        args: {}
      },
      chrome: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            // Arguments passed to the command
            'browser': 'chrome'
          }
        }
      },
    },
  });

  grunt.registerTask('default', [
    'copy:cov',
    'instrument',
    'express:cov',
    'protractor_coverage:chrome',
    'makeReport'
  ]);
};