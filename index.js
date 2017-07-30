const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const currentDirectory = process.argv[2]
const config = path.join(currentDirectory, 'version.yml')
const version = process.argv[3]

fs.stat(config, (err, res) => {
  if (err) {
    console.log('version.yml not found skipping...')
    return
  }

  try {
    const v = yaml.safeLoad(fs.readFileSync(config, 'utf8'))
    v.version = version

    const y = yaml.safeDump(v, {
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
        console.log(`writing ${chalk.green(version)} to version.yml...`)
        fs.writeFile(config, y)
      }
    })
  } catch (err) {
    throw new Error(err)
  }
})
