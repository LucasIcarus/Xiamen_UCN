var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    pngquant = require('imagemin-pngquant');


gulp.task('css', function () {
    return gulp.src('./css/main.css')
        .pipe(cleanCSS({compability: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'IE 7'],
            cascade: false
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'));
});

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
})

