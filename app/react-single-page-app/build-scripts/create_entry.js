const fs = require('fs')
const path = require('path')
const readline = require("readline")

const gulp = require("gulp")
const replace = require("gulp-replace")
const rename = require("gulp-rename")
const upperCamelCase = require('uppercamelcase')
const {execSync} = require("child_process")


module.exports = function(entry, callback){

  console.log(path.resolve(__dirname, "../src/entry", entry + ".js"))

  if(!fs.existsSync(path.resolve(__dirname, "../src/entry", entry + ".js"))) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question("Entry " + entry + '.js is not found, do u want to create ? [y/n]:', function(answer){

      answer = answer.trim()
      if(answer = 'y') {
        console.log("creating entry:" + entry + ".js")

        const camelEntry = upperCamelCase(entry)


        gulp.task("entry", function(){
          gulp.src(path.resolve(__dirname, '../file-templates/entry.tmpl'))
            .pipe(replace(/__SCREEN_NAME__/g, camelEntry))
            .pipe(rename(entry + ".js"))
            .pipe(gulp.dest(path.resolve(__dirname, "../src/entry")))
        })

        gulp.task("screen", function(){
          gulp.src(path.resolve(__dirname, '../file-templates/screen.tmpl'))
            .pipe(replace(/__SCREEN_NAME__/g, camelEntry))
            .pipe(rename(camelEntry + ".js"))
            .pipe(gulp.dest(path.resolve(__dirname, "../src/screen")))
        })

        gulp.start(['entry', 'screen'])

        setTimeout( () => {

          execSync("dudy -i " + path.resolve(__dirname, "../src"))
          rl.close()
          callback()
          console.log('done')
        }, 500)
      }
      else {
        process.exit()
      }


    })


  }else {

    callback()
  }


}
