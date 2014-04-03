/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

 'use strict';

 module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      css: {
        files: ['Resources/Public/css/*.scss'],
        tasks: ['sass']
      }
    },

      sass: {                              // Task
          dist: {                            // Target
              options: {                       // Target options
                  style: 'compressed'
              },
              files: {                         // Dictionary of files
                  'Resources/Public/css/main.css': 'Resources/Public/css/main.scss',       // 'destination': 'source'
              }
          }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-git-ftp');

  // Default task.
  grunt.registerTask('default', ['sass']);

};
