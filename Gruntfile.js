module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
				files: {
					'./public/styles/site.css': './app/styles/site.scss'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'./public/styles/full.min.css': ['./bower_modules/normalize.css/normalize.css','./user_modules/Stackicons/stackicons-social-minimal.min.css','./public/styles/site.css']
				}
			}
		},
		markdown: {
			all: {
				files: [
				{
					expand: true,
					cwd: './app/pages/projecten',
					src: ['*.md'],
					dest: './.tmp/',
					ext: '.html'
				}
				],
				options: {
					template: './app/pages/projecten/_markdowntemplate.html',
					preCompile: function(src, context) {
						var title = src.split('\n')[0];
						title = title.replace('## ','');
						context.title = title;
					}
				}
			}
		},
		bake: {
			build: {
				files: [{
					expand: true,
					cwd: './app',
					src: ['*.html'],
					dest: './public',
					ext: '.html'
				},
				{
					expand: true,
					cwd: './app/pages',
					src: ['*.html'],
					dest: './public/pages',
					ext: '.html'
				},
				{
					expand: true,
					cwd: './.tmp',
					src: ['*.html'],
					dest: './public/pages/projecten',
					ext: '.html'
				}
				]
			},
		},
		watch: {
			sass: {
				files: ['app/styles/*.scss'],
				tasks: ['sass','cssmin']
			},
			html: {
				files: ['app/{,*/}*.html'],
				tasks: ['bake']
			},
			markdown: {
			files: ['app/pages/{,*/}*.md'],
				tasks: ['markdown','bake']
			},
			js: {
			files: ['app/{,*/}*.js'],
				tasks: ['copy']
			}
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
				dest: './public/javascript/_bower.js',
				exclude: ['normalize.css'],
				bowerOptions: {
					relative: false
				}
			}
		},
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './app/',
                    dest: './public/',
                    src: [
                        'javascript/{,*/}*.js',
						'images/{,*/}*.*',
                        'fonts/{,*/}*.*'
                    ]
                }]
            }
        },
	});

	grunt.registerTask('default',['render','watch']);
	grunt.registerTask('init',['bower_concat','copy']);
	grunt.registerTask('render',['init','sass','cssmin','markdown','bake']);
	grunt.registerTask('serve', ['render','connect:server','watch']);
};
