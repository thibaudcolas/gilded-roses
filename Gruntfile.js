/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      package: grunt.file.readJSON('package.json'),
      src: {
        main: 'src/',
        test: 'spec/'
      },
      bin: {
        coverage: 'bin/coverage'
      }
    },
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js', 'spec/**/*.js']
      }
    },
    jasmine: {
      coverage: {
        src: '<%= meta.src.main %>/js/*.js',
        options: {
          specs: '<%= meta.src.test %>/js/*.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: '<%= meta.bin.coverage %>/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: '<%= meta.bin.coverage %>/html'
                }
              },
              {
                type: 'cobertura',
                options: {
                  dir: '<%= meta.bin.coverage %>/cobertura'
                }
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('test:coverage', ['jasmine:coverage']);

};
