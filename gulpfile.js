"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Opens a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local development server
gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    })
});

//Open index.html in the browser at http://localhost:9005
gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}))
});

//move all html files from ./src to ./dist & reload browser
gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload()); //connect is the dev server we downloaded from npm
});

//javascript bundling task
gulp.task('js', function(){
    browserify(config.paths.mainJs)
        .transform(reactify) //transform any js we get using reactify plug-in to compile JSX
        .bundle()  //bundle everything we get into 1 file
        .on('error', console.error.bind(console)) //if any errors come up, send to console
        .pipe(source('bundle.js')) //name that file
        .pipe(gulp.dest(config.paths.dist + '/scripts')) //define destination path as ./dist/scripts
        .pipe(connect.reload()); //reload
});

//css task to bundle css
gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images',function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //public favicon.ico
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
            .pipe(lint({config: 'eslint.config.json'}))
            .pipe(lint.format());
});

//watch files & run the 'html' task if anything changes
gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']); //lint evertime JS changes as well
});

//define the default task to run tasks defined in array
gulp.task('default', ['html', 'js', 'css', 'lint', 'images', 'open', 'watch']);