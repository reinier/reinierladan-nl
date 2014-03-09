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
				files: ['src/*.scss','src/sass/*.scss','src/*.html','src/html_includes/*.html','src/projecten/*.html','src/projecten/*.md'],
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
				},
				{
			        expand: true,
			        cwd: './src/projecten',
			        src: ['*.html'],
			        dest: './public/projecten',
			        ext: '.html'
				}
				]
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
		    bowerOptions: {
		      relative: false
		    }
		  }
		},
		markdown: {
			all: {
				files: [
				{
					expand: true,
					cwd: './src/projecten',
					src: ['*.md'],
					dest: './src/projecten/.tmp/',
					ext: '.html'
				}
				],
				options: {
					template: './src/projecten/markdowntemplate.jst'
				}
			}
		}
	});

	grunt.registerTask('default',['watch:build']);
	grunt.registerTask('render',['sass','cssmin','markdown','bake','bower_concat']);
	grunt.registerTask('serve', ['connect:server','default']);
};
