const gulp = require("gulp")
const path = require("path")
const replace = require("gulp-replace")
module.exports = function (js_install_path, html_file) {

  const files = [
    "moxie.min.js", 
    "Moxie.swf", 
    "plupload.min.js", 
    "qiniu.min.js"]

  const prts = html_file.split("/")
  prts.pop()
  const html_path = prts.join("/")
  const srcFiles = files.map(x => path.resolve(__dirname, x))
  const tarFiles = files.map(x => path.resolve(js_install_path, x))
  const scriptFiles = files.map(x => "js/" +  x)
    .map(f => {
      return `  <script src='${f}'></script>`
    })
    .join("\n")


  gulp.task("copy", function () {
    gulp.src(files)
      .pipe(gulp.dest(js_install_path))
  })


  const srcs = gulp.src(tarFiles)

  console.log(scriptFiles)
  gulp.task("inject", function(){
    gulp.src(html_file)
      .pipe(replace(/<!--\s+plugin:(\w+)\s+-->/, scriptFiles))
      .pipe(gulp.dest(html_path))
  })


  gulp.run(['copy', 'inject'])
}