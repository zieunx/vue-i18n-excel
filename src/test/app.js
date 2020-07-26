#!usr/bin/env node

const fileFinder = require('./fileFinder')

exports.main = () => {
  fileFinder.makeJsonForXls('/src/lang/', 'ko.js')
}
