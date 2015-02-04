module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // express: {
    //   options: {
    //     port: 9000,
    //     // hostname: 'localhost',
    //     base: 'instrumented',
    //   },
    //   cov: {
    //     options: {
    //       script: 'instrumented/src/file1.js',
    //       debug: true
    //     }
    //   },
    // },
    // open: {
    //   server: {
    //     url: 'http://localhost:9000'
    //   }
    // },


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

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'instrumented'
        }
      },
    },

    // start - code coverage settings
    instrument: {
      files: ['src/file1.js'],
      options: {
        lazy: false,
        // lazy: true,
        basePath: 'instrumented'
      }
    },


    protractor_coverage: {
      options: {
        configFile: 'protractor.conf.js',
        keepAlive: true,
        noColor: false,
        coverageDir: 'instrumented',
        args:{
        }
      },
      local: {
        options: {
          args: {
            'baseUrl': 'http://localhost:9000/',
            // 'browser': 'chrome',
            // 'specs': ['spec/file1.test.js'],
          }
        }
      }
    },


    makeReport: {
      src: 'instrumented/*.json',
      options: {
        type: 'html',
        dir: 'reports/',
        // print: 'detail'
        //        type: 'lcov',
        //        dir: 'reports',
        //        print: 'detail'
      }
    },

  });

  grunt.registerTask('default', [
    'copy:cov',
    'instrument',
    'connect',
    'protractor_coverage:local',
    'makeReport'
  ]);

  grunt.registerTask('pc', [
    // 'protractor_coverage:local',
  ]);
};