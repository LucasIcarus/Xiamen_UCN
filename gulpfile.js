var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    pngquant = require('imagemin-pngquant');



gulp.task('sass', function () {
    
    // define a stream object for async.
    var stream = sass('./_sass/main.scss', {sourcemap: true, style: 'expanded'})
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: './_sass'
        }))
        .pipe(gulp.dest('./css'));
    
    return stream;
});

gulp.task('css-pre', ['sass'], function () {
    gulp.src('./css/main.css')
        .pipe(cleanCSS({compability: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'IE 7'],
            cascade: false
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('css', ['sass', 'css-pre']);

gulp.task('img', function () {
    return gulp.src('./_img/**.*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});

gulp.task('html', function () {
    return gulp.src('./_src/*.html')
        .pipe(htmlmin({collapseWhiteSpace: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    watch('./_sass/**.scss', batch(function (event, done) {
        gulp.start('css', done);
    }));
    
    watch('./_src/**.html', batch(function (event, done) {
        gulp.start('html', done);
    }));
});