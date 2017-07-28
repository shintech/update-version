const yaml = require('js-yaml')
const fs = require('fs')

var filename = process.argv[2]
var version = process.argv[3]

if (filename !== undefined) {
  try {
    var v = yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
    v.version = version
    var y = yaml.safeDump(v, {
      'sortkeys': true
    })
    fs.stat('./package.json', (err, results) => {
      if (err) throw new Error(err)
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
}
