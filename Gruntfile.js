module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
		        files: {
		            './public/css/reinierladan.css': './src/site.scss'
		        }
		    }
	    },
		watch: {
			build: {
				files: ['src/*.scss','src/*.html','html_includes/*.html'],
				tasks: ['sass','cssmin','bake']
			},
		},
		cssmin: {
			combine: {
				files: {
					'./public/css/reinierladan.min.css': ['./public/css/reinierladan.css']
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
	grunt.registerTask('render',['sass','cssmin','bake']);
};
