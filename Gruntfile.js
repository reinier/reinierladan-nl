module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
		        files: {
		            './src/site.css': './sass/site.scss'
		        }
		    }
	    },
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass','cssmin']
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
	});

	grunt.registerTask('default',['watch:css']);
};
