var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');

gulp.task('babel', function () {
  return gulp.src('src/app.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch(
    [
      './src/*.js',
    ],
    ['babel']
  )
})

gulp.task('default', ['babel']);
