// Less configuration
var gulp = require('gulp')
    , minify = require('gulp-minify')
    , concat = require('gulp-concat')
    , sftp = require('gulp-sftp')
    , less = require('gulp-less')
    , path = require('path')
    , rename = require('gulp-rename')
    , minifyCSS = require ('gulp-minify-css')
    , smushit = require('gulp-smushit')
    ;

var jsSrc = './src/tournament_schedule/src/**/*.js'
    , lessSrc = './src/tournament_schedule/src/**/*.less';

// compress
gulp.task( 'compress-js', function() {
    gulp.src( [
            // './tournament_schedule/libs/datetimepicker/*.js'
            // , './tournament_schedule/libs/datetimepicker/jquery.datetimepicker.js'
            jsSrc
        ] )
        .pipe( concat( 'event-manager.js', {newLine: '\r\n\n'} ) )
        .pipe( minify({
            ext: {
                src: '-debug.js',
                min: '-min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js','.min.js'],
            preserveComments: 'some'
        }) )
        .pipe( gulp.dest( './src/tournament_schedule/js' ) )
});

gulp.task( 'compress-css', function() {
    gulp.src([lessSrc])
        .pipe( less({
            paths: [ path.join( __dirname, 'less', 'includes' ) ]
        }) )
        .pipe( minifyCSS() )
        .pipe( rename( 'event-manager-min.css' ) )
        .pipe( gulp.dest( './src/tournament_schedule/css' ) )
} );


gulp.task( 'smushit', function () {
    return gulp.src( ['./src/images/**/*.{jpg,JPG,png,PNG}'] )
        .pipe( smushit( {
                verbose: true
        } ))
        .pipe(gulp.dest('smushit-img'));
});


gulp.task( 'default', ['compress-js', 'compress-css'], function() {
    // gulp.watch( [ 'tournament_schedule/src/js/*.js' ], ['compress']);
});