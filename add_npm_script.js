const fs = require('fs')
function add_npm_script(file) {

  const json = JSON.parse(fs.readFileSync(file, "utf-8"))

  json.scripts = {
    dev : "dudy -i ./src && NODE_ENV=development node ./build-scripts/webpack.build.js -e",
    dev_win : "dudy -i ./src && set NODE_ENV=development && node ./build-scripts/webpack.build.js -e",
    build: "NODE_ENV=production node ./build-scripts/webpack.build.js -e",
    build_win : "NODE_ENV=productio nnode ./build-scripts/webpack.build.js -e",
  }

  fs.writeFileSync(file, JSON.stringify(json, null, 4))
}


module.exports = add_npm_script
