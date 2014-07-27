/*
 * css-lab build file.
 *
 * Copyright (c) 2014 George Norman
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *   http://www.apache.org/licenses/LICENSE-2.0
 */
module.exports = function(grunt) {
  'use strict';

  var bannerTemplate = '/*!\n' +
        '  ~ cssLab-<%= pkg.version %>.${EXT}\n' +
        '  ~ Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '  ~ Licensed under the <%= pkg.license.type %>: <%= pkg.license.url %>\n' +
        '*/\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // https://github.com/gruntjs/grunt-contrib-clean
    clean: ["target"],

    // https://github.com/gruntjs/grunt-contrib-concat/blob/master/docs/concat-examples.md
    concat: {
      // concat all third-party libs, vendor libs, external libs, to: 'lib-fragment.[js,css]'
      libFragments: {
        files: {
          'target/js/lib-fragment.js': '<%= pkg.cssLabFiles.libJs %>',
          'target/css/lib-fragment.css': '<%= pkg.cssLabFiles.libCss %>'
        }
      },

      // concat all CSS-Lab specific files to: 'cssLab-fragment.[js,css]'
      cssLabFragments: {
        files: {
          'target/js/cssLab-fragment.js': '<%= pkg.cssLabFiles.cssLabFragmentsJs %>',
          'target/css/cssLab-fragment.css': '<%= pkg.cssLabFiles.cssLabFragmentsCss %>'
        }
      },

      // concat all fragments, with prepended banner, to: 'cssLab-VERSION.[js,css]'
      cssLabCssFinal: {
        files: {
          'target/css/cssLab-<%= pkg.version %>.css': ['target/css/lib-fragment.css', 'target/css/cssLab-fragment.css']
        },
        options:{
          banner: bannerTemplate.replace(/\${EXT}/g, "css")
        }
      },
      cssLabJsFinal: {
        files: {
          'target/js/cssLab-<%= pkg.version %>.js': ['target/js/lib-fragment.js', 'target/js/cssLab-fragment.js']
        },
        options:{
          banner: bannerTemplate.replace(/\${EXT}/g, "js")
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      cssLab: {
        files: {
          'target/js/cssLab-<%= pkg.version %>-min.js': ['target/js/cssLab-<%= pkg.version %>.js']
        }
      },
      options: {
        preserveComments: 'some',
        sourceMap: true
      }
    },

    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      cssLab: {
        src: 'target/css/cssLab-<%= pkg.version %>.css',
        dest: 'target/css/cssLab-<%= pkg.version %>.css'
      }
    },

    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      cssLab: {
        files: {
          'target/css/cssLab-<%= pkg.version %>-min.css': ['target/css/cssLab-<%= pkg.version %>.css']
        }
      }
    },

    // https://github.com/yoniholmes/grunt-text-replace
    replace: {
      cssLab: {
        src: ['src/*.html'],
        dest: 'target/',
        // NOTE: release JS and CSS file names are all lowercase
        replacements: [{
          // use single minified file for PRD
          from: 'css/all-css.css',
          to: 'css/csslab-<%= pkg.version %>-min.css'
        }, {
          // use single minified file for PRD
          from: 'js/all-javascript.js',
          to: 'js/csslab-<%= pkg.version %>-min.js'
        }]
      }
    },

    // https://www.npmjs.org/package/grunt-contrib-copy
    copy: {
      // NOTE: release JS and CSS file names are all lowercase
      release: {
        files: [
          {expand: true, flatten: true, src: ['target/js/csslab-<%= pkg.version %>.js', 'target/js/csslab-<%= pkg.version %>-min.js'], dest: 'releases/<%= pkg.version %>/js/'},
          {expand: true, flatten: true, src: ['target/css/csslab-<%= pkg.version %>.css', 'target/css/csslab-<%= pkg.version %>-min.css'], dest: 'releases/<%= pkg.version %>/css/'},
          {expand: true, flatten: true, src: ['target/*.html'], dest: 'releases/<%= pkg.version %>/'},
          {expand: true, flatten: true, src: ['src/img/*'], dest: 'releases/<%= pkg.version %>/img/'},
          {expand: true, flatten: true, src: ['src/img/logo/*'], dest: 'releases/<%= pkg.version %>/img/logo/'},
          {expand: true, flatten: true, src: ['src/img/scenic/*'], dest: 'releases/<%= pkg.version %>/img/scenic/'}
        ]
      }
    },

    jsdoc : {
      dist : {
        src: ['src/js/*.js', 'src/js/*/*.js', 'test/*.js', 'src/js/README.md'],
        options: {
          destination: 'releases/<%= pkg.version %>/jsdoc'
        }
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jsdoc');

  // register sub-tasks
  grunt.registerTask('assemble-fragments', ['concat:cssLabFragments', 'concat:libFragments']);
  grunt.registerTask('assemble-final', ['concat:cssLabCssFinal', 'concat:cssLabJsFinal']);

  // register main task(s)
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('release', ['assemble-fragments', 'assemble-final', 'uglify:cssLab', 'autoprefixer:cssLab', 'cssmin:cssLab', 'replace:cssLab', 'copy:release', 'docs']);

  // register default task
  grunt.registerTask('default', ['clean', 'release']);
};
