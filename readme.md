# Read me for development

## Requirements
- Grunt
- Bower
- Sass
- Bourbon
- Neat
- And maybe stuff needed to run the listed things

## Quick setup
- Make sure you have the above listed tools installed on your system
- Run the following inside the project root:
```bash
    bower install
    npm install
    cd sass/
    bourbon install
    neat install
    cd ../
```

- Then you are ready to startup Grunt in the root directory: `grunt`
- Whenever you edit and save `sass/site.scss` Grunt will compile the correct css for you inside `public/css/reinierladan.min.css`
- That's pretty much it.

## Thanks to (this site makes use of the following libs…)
- [Normalize.css](http://git.io/normalize) 
- [StackIcons](http://stackicons.com) (not trough Bower yet, so copied it from source)
