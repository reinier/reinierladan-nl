module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
		        files: {
		            './src/site.css': './src/sass/site.scss'
		        }
		    }
	    },
		watch: {
			build: {
				files: ['**/*.scss','src/*.html','html_includes/*.html'],
				tasks: ['sass','cssmin','bake']
			},
			options: {
		      forever: true,
		    },
		},
		cssmin: {
			combine: {
				files: {
					'./public/css/reinierladan.min.css': ['./bower_components/normalize.css/normalize.css','./src/stackicons-social-minimal.min.css','./src/site.css']
				}
			}
		},
		bake: {
	        build: {
	            files: {
	                "public/index.html": "src/index.html"
	            }
	        },
	    },
	});

	grunt.registerTask('default',['watch:build']);
};
