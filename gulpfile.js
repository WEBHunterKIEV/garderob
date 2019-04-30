const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');



// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "distr"
        }
    });

    gulp.watch('distr/**/*').on('change', browserSync.reload);
});


// PUG
gulp.task('compile:pug', function buildHTML() {
    return gulp.src('dev/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('distr'))
});


// SASS
gulp.task('compile:sass', function () {
    return gulp.src('dev/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('distr/css'));
});




// COPY FONTS
gulp.task('copy:fonts',function() {
    return gulp.src('./dev/fonts/**/*')
    .pipe(gulp.dest('distr/fonts'));
});


// COPY IMAGES
gulp.task('copy:images', function() {
    return gulp.src('./dev/images/**/*')
    .pipe(gulp.dest('distr/images'));
});


// COPY
gulp.task('copy', gulp.parallel('copy:fonts','copy:images'));


// WATCHERS
gulp.task('watch', function() {
    gulp.watch('dev/template/**/*.pug', gulp.series('compile:pug'));
    gulp.watch('dev/styles/**/*.scss', gulp.series('compile:sass'));
})



// default
gulp.task('default', gulp.series(
    gulp.parallel('compile:pug','compile:sass','copy'),
    gulp.parallel('watch','server')
))





   
