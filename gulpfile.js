// JS_SRC = [
// 	"clueless/js/vendor/jquery-3.5.1.js",
// 	"clueless/js/vendor/bootstrap.min.js",
// 	"clueless/js/vendor/socket.io.js",
// 	"clueless/js/main.js",
// ];
//
// const {dest, series, src} = require('gulp');
//
// var concat      = require('gulp-concat'),
//     uglify      = require('gulp-uglify'),
//     sourcemaps  = require('gulp-sourcemaps');

function concatJS() {
  // return src(JS_SRC)
  //   .pipe(sourcemaps.init())
  //   .pipe(concat('app.min.js'))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write())
  //   .pipe(dest('build/js'));
}

// exports.build = series(
//   concatJS
// );
