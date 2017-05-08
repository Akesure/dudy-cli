const fs = require('fs')
const path = require('path')

const {usage, prompt_usage, error} = require("./util")

const PATH_SPLITER = new RegExp('[/\\\\]')
/**
 * 创建package.json的模板
 */
const tpl_pkg = (pkgName) => {
  return `{
  "name" : "${pkgName}"
}
  `
}

function create_index(base, dir, create_pkg_json = false) {

  const files = []
  function find_files_rec(_dir) {
    const l = fs.readdirSync(path.resolve(base, _dir))
    l.forEach(file => {
      if (fs.statSync(path.resolve(base, _dir, file)).isDirectory()) {
        find_files_rec(path.join(_dir, file))
      }
      else {
        const list = path.join(_dir, file).split(PATH_SPLITER)
        list.shift()
        const fullName = list.join("/")
        files.push([file, fullName, path.resolve(base, _dir, file)])
      }
    })
  }

  find_files_rec(dir)


  const full_idx_file = path.resolve(base, dir, "index.js")
  // 创建package.json
  if(create_pkg_json) {

    const full_pgk_file = path.resolve(base, dir, "package.json")
    fs.writeFileSync(full_pgk_file, tpl_pkg(dir))

  }

  // 创建index.js
  const headers = []
  const lines = []
  files.forEach(p => {
    const [name, fullName, fullFileName] = p
    if (!fullName.match(/\.js$/)) {
      return
    }
    if (!name.match(/package\.json|index\.js|global/)) {

      const moduleName = name.split(".").shift()
      const fileContent = fs.readFileSync(fullFileName, 'utf-8')

      if (fileContent.match(/export\s+default\s+class\s+\w+/)) {
        const m = fileContent.match(/export\s+default\s+class\s+\w+/g)
        m.forEach(k => {
          const n = k.split(/\s/).pop()

          const _line = `  get ${n}() { return  require("./${fullName}").default },`
          lines.push(_line)
        })

      }
      else if (fileContent.match(/module.exports/)) {

        if(fileContent.match(/module.exports\s+=\s+\{/)){
          const m = fileContent.match(/module.exports\s+=\s+\{(.|\n)+\}/)
          const __lines = m[0].split('\n')

          __lines.filter(x => x.match(/:/)).forEach(line => {
            const [l, r] = line.split(":").map(x => x.trim())
            lines.push(`  get ${l}() { return require("./${fullName}").${l} },`)
          })

        } else {
          const _line = `  get ${moduleName}() { return require("./${fullName}") },`
          lines.push(_line)
        }
      }
      else if (fileContent.match(/export\s+let\s+\w+/)) {

        const m = fileContent.match(/export\s+let\s+\w+/)
        m.forEach(k => {
          const n = k.split(/\s/).pop()
          //headers.push(`const ${moduleName} = require("./${fullName}")`)
          const _line = `  get ${moduleName}() {return require('./${fullName}').${moduleName} },`
          lines.push(_line)
        })
      }
      else if (fileContent.match(/export\s+const\s+\w+/)) {
        const m = fileContent.match(/export\s+const\s+\w+/g)
        //headers.push(`const ${moduleName} = require("./${fullName}")`)
        m.forEach(k => {
          const n = k.split(/\s/).pop()
          const _line = `  get ${n}() { return require("./${fullName}").${n}},`
          lines.push(_line)
        })
      }
      else if (fileContent.match(/export\s+class\s+\w+/)) {
        const m = fileContent.match(/export\s+class\s+\w+/)
        m.forEach(k => {
          const n = k.split(/\s/).pop()
          //headers.push(`const ${moduleName} = require("./${fullName}")`)
          const _line = `  get ${moduleName}() {return require('./${fullName}').${moduleName}},`
          lines.push(_line)
        })
      }
      else {
        error("nothing to export in file " + fullName)
        return
        //throw 'unkown type in ' + fullName
      }
      //lines.push(`  get ${moduleName}(){ return require("./${fullName}").default }, `)

    }
  })
  const content = `
${headers.join("\n")}
module.exports = {
${lines.join("\n")}
}
  `
  fs.writeFileSync(full_idx_file, content)
}


function renew_idx (dir) {

  if(!dir.match(/src|app/)) {
    error("You should specify a dir named src or app.")
    return
  }
  const files = fs.readdirSync(dir)

  const exceptions = ['node_modules', 'git', 'gitignore']
  // 循环一级目录结构
  files.forEach(file => {

    if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
      
      for(let i = 0; i < exceptions.length; i++) {
        if(file.match(new RegExp(exceptions[i]))){
          return
        }
      }
      create_index(dir, file)
    }
  })
}


module.exports = renew_idx