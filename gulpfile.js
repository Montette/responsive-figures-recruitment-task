let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let useref = require('gulp-useref');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
const autoprefixer = require('gulp-autoprefixer');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss') 
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.reload({
          stream:true
      }))
  });

  gulp.task('watch', ['browserSync', 'sass'], ()=> { 
    gulp.watch('src/sass/**/*.scss', ['sass'])
    gulp.watch('src/*.html', browserSync.reload)
    gulp.watch('src/js/**/*.js', browserSync.reload)
  })

  gulp.task('clean:dist', () => {
    return del.sync('dist');
  })

gulp.task('useref', ()=> {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
})

gulp.task('serve', function (callback) {
    runSequence(['watch', 'sass', 'browserSync'],
      callback
    )
  })

  gulp.task('build', function (callback) {
    runSequence('clean:dist', ['serve'], 'useref',
      callback)
 })