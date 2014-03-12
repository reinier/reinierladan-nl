# Read me

Follow the development of this site on [beta.reinierladan.nl](http://beta.reinierladan.nl)

## Requirements
- [Grunt](http://gruntjs.com)
- [Bower](http://bower.io)
- [Sass](http://sass-lang.com)
- [Bourbon](http://bourbon.io) (Sass extension)
- [Neat](http://neat.bourbon.io) (Bourbon extension)
- [Bitters](http://bitters.bourbon.io) (Bourbon extension)
- And maybe stuff needed to run the listed things

## Quick setup
- Make sure you have the above listed tools installed on your system
- Run the following inside the project root:
```bash
    bower install
    cd user_modules/
    bourbon install
    neat install
    bitters install
    cd ../
    npm install
```

- Then you are ready to startup Grunt in the root directory to watch for changes and compile them: `grunt serve`

## Thanks to
(this site makes use of the following libs…)
- [Normalize.css](http://git.io/normalize)
- [StackIcons](http://stackicons.com) (not through Bower yet, so copied it from source)
