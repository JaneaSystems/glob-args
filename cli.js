#!/usr/bin/env node
const globArgs = require('./index')
const { spawn } = require('child_process')

const args = globArgs(process.argv.splice(2), {escape: true})
if (args.length > 0) {
  const child = spawn(args[0], args.splice(1), {
    stdio: 'inherit',
    shell: true
  })
  child.on('exit', process.exit)
}
