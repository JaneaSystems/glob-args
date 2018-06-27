const glob = require('glob')

function parse (argv, options) {
  let parsedArgs = []
  let escapeChar = options && options.escape ? '"' : ''
  if (argv) {
    argv.forEach((pattern) => {
      const matched = glob.sync(pattern)
      if (matched && matched.length > 0) {
        matched.forEach((match) => parsedArgs.push(`${escapeChar}${match}${escapeChar}`))
      } else {
        parsedArgs.push(pattern)
      }
    })
  }
  return parsedArgs
}

module.exports = parse
