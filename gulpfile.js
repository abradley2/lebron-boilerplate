// Gulpfile.js
var gulp = require('gulp')
  , soften = require('gulp-soften')

gulp.task('soften', function () {
  gulp.src('./**/*.js')
      .pipe(soften(2))
      .pipe(gulp.dest('./'))
})
