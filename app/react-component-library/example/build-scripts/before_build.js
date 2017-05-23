const path = require('path')
const fs = require("fs")
const gulp = require("gulp")
const replace = require("gulp-replace")
const rename = require("gulp-rename")


module.exports = function(entry) {
  gulp.task('html', function () {
    if (!fs.existsSync(path.resolve(__dirname, "../dist/dev", entry + ".html"))) {
      gulp.src(path.resolve(__dirname, '../file-templates', 'index.html'))
        .pipe(replace(/\{\{__ENTRY_JS__\}\}/g, entry + '.js'))
        .pipe(rename(entry + ".html"))
        .pipe(gulp.dest(path.resolve(__dirname, "../dist/dev")));
    }
    if (!fs.existsSync(path.resolve(__dirname, "../dist/prod", entry + ".html"))) {
      gulp.src(path.resolve(__dirname, '../file-templates', 'index-prod.html'))
        .pipe(replace(/\{\{__ENTRY_JS__\}\}/g, entry + '.js'))
        .pipe(rename(entry + ".html"))
        .pipe(gulp.dest(path.resolve(__dirname, "../dist/prod")));
    }
  });

  gulp.task("copy", function(){
    gulp.src(path.join(__dirname, "../file-templates/*.js"))
      .pipe(gulp.dest(path.resolve(__dirname, '../dist/js')))
  })
  gulp.start(['html', 'copy'])
}