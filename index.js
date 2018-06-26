const glob = require('glob')

function parse (argv) {
  let parsedArgs = []
  if (argv) {
    argv.forEach((pattern) => {
      const matched = glob.sync(pattern)
      if (matched && matched.length > 0) {
        matched.forEach((match) => parsedArgs.push(`"${match}"`))
      } else {
        parsedArgs.push(pattern)
      }
    })
  }
  return parsedArgs
}

module.exports = parse
