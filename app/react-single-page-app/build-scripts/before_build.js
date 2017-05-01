const path = require('path')
const gulp = require("gulp")
const replace = require("gulp-replace")
const rename = require("gulp-rename")


module.exports = function(entry) {
  gulp.task('html', function () {
    gulp.src(path.resolve(__dirname, '../file-templates', 'index.html'))
      .pipe(replace(/\{\{__ENTRY_JS__\}\}/g, entry + '.js'))
      .pipe(rename(entry + ".html"))
      .pipe(gulp.dest(path.resolve(__dirname, "../dist")));
  });

  gulp.task("copy", function(){
    gulp.src(path.join(__dirname, "../file-templates/*.js"))
      .pipe(gulp.dest(path.resolve(__dirname, '../dist/js')))
  })
  gulp.start(['html', 'copy'])
}