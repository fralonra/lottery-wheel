const gulp = require('gulp');
const babelify = require('babelify');
const bro = require('gulp-bro');
const changed = require('gulp-changed');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const pkg = require('./package.json');

const buildClean = () => {
  gulp.src('dist', {read: false})
    .pipe(clean());
};

const buildJs = () => {
  gulp.src('src/*.js')
    .pipe(changed('dist/lib'))
    .pipe(bro({
      transform: [
        babelify.configure({
          presets: ['@babel/preset-env']
        })
      ]
    }))
    .pipe(rename({ basename: pkg.name }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({
      basename: pkg.name,
      suffix: '.min' }))
    .pipe(gulp.dest('dist'));
};

gulp.task('clean', buildClean);
gulp.task('build', ['clean'], buildJs);
