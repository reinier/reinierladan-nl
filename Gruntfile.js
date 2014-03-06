module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
		        files: {
		            './public/css/site.css': './src/site.scss'
		        }
		    }
	    },
		watch: {
			build: {
				files: ['src/*.scss','src/*.html','src/html_includes/*.html'],
				tasks: ['render']
			},
		},
		cssmin: {
			combine: {
				files: {
					'./public/css/full.min.css': ['./bower_components/normalize.css/normalize.css','./src/user_components/stackicons-social-minimal.min.css','./public/css/site.css']
				}
			}
		},
		bake: {
	        build: {
	            files: [{
			        expand: true,
			        cwd: './src',
			        src: ['*.html'],
			        dest: './public',
			        ext: '.html'
				}]
	        },
	    },
		connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    base: './public',
                    open: true
                }
            }
        },
		bower_concat: {
		  all: {
		    dest: './public/js/_bower.js',
		    exclude: [
		        'normalize.css'
		    ],
			dependencies: {
		      'headroom': 'jquery',
		      'jquery-colorbox': 'jquery'
		    },
		    bowerOptions: {
		      relative: false
		    }
		  }
		}
	});

	grunt.registerTask('default',['watch:build']);
	grunt.registerTask('render',['sass','cssmin','bake','bower_concat']);
	grunt.registerTask('serve', ['connect:server','default']);
};
