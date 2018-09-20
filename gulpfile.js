let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let useref = require('gulp-useref');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss') // gwiazdki - każdy plik scss, nawet plik - dziecko - zagnieżdżony
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.reload({
          stream:true
      }))
  });

  gulp.task('watch', ['browserSync', 'sass'], ()=> { // nawias kwadratowy - taski które mają sie wykonac przed uruch. watch
    gulp.watch('src/sass/**/*.scss', ['sass'])
    gulp.watch('src/*.html', browserSync.reload)
    gulp.watch('src/js/**/*.js', browserSync.reload)
  })


gulp.task('useref', ()=> {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
})
