const fs = require('fs')
function add_npm_script(file) {

  const json = JSON.parse(fs.readFileSync(file, "utf-8"))

  json.scripts = {
    dev : "dudy -i ./src && NODE_ENV=development ./build-scripts/webpack.build.js -e",
    build: "NODE_ENV=publish ./build-scripts/webpack.build.js -e"
  }

  fs.writeFileSync(file, JSON.stringify(json, null, 4))
}


module.exports = add_npm_script
