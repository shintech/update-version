const yaml = require('js-yaml')
const fs = require('fs')
var path = require('path')
var filename = path.join(process.argv[2], 'version.yml')
var version = process.argv[3]

fs.stat(filename, (err, res) => {
  if (err) {
    console.log('version.yml not found skipping...')
    return
  }

  try {
    var v = yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
    v.version = version
    var y = yaml.safeDump(v, {
      'sortkeys': true
    })

    fs.stat('./package.json', (err, results) => {
      if (err !== null && err.path !== './package.json') {
        console.log(err)
      }

      if (results !== undefined) {
        console.log('package.json exists...\nskipping version update...\n')
        return false
      } else {
        console.log(`writing ${version} to version.yml...`)
        fs.writeFile(filename, y)
      }
    })
  } catch (err) {
    throw new Error(err)
  }
})
