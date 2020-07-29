#!usr/bin/env node

const fileFinder = require('./exportJson')

exports.main = () => {
  fileFinder.makeJsonForXls('/src/lang/', 'ko.js')
}
