const {join} = require('path')
const {spawnSync} = require('child_process')
const {EOL} = require('os')
const globArgs = require('..')

process.chdir(join(__dirname, 'fixture'))

// Test module
function testModule (escape) {
  let escapeChar = escape === true ? '"' : ''
  const expected = [
    'non-existing',
    `${escapeChar}file1.txt${escapeChar}`,
    `${escapeChar}file2 .txt${escapeChar}`,
    `${escapeChar}sub folder/file4 .txt${escapeChar}`
  ]
  const found = globArgs(['non-existing', '*.txt', '*/*.txt'], escape === undefined ? undefined : {escape})
  if (expected.length !== found.length ||
      !expected.every((f) => found.indexOf(f) >= 0)) {
    console.log(`Module test failed!`)
    console.log(`Expected:\n\t${expected.join('\n\t')}`)
    console.log(`Got:\n\t${found.join('\n\t')}`)
    process.exit(-1)
  }
}

// Test CLI
function testCLI () {
  // on Linux, shell will espace the globs before we can do anything
  const expected = process.platform === 'win32'
    ? `"file1.txt" "file2 .txt" "sub folder/file4 .txt"${EOL}`
    : `file1.txt file2 .txt sub folder/file4 .txt${EOL}`
  const result = spawnSync(process.argv0,
    [ join(__dirname, '..', 'cli.js'), 'echo', '*.txt', '*/*.txt' ],
    { encoding: 'utf8' })
  if (result.stdout !== expected) {
    console.log('CLI test failed!')
    console.log(`Expected:\n\t'${expected}'`)
    console.log(`Got:\n\t'${result.stdout}'`)
    process.exit(-1)
  }
}

testModule()
testModule(true)
testModule(false)
testCLI()
console.log('OK!')
