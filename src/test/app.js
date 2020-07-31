#!usr/bin/env node

const exportJson = require('./exportJson')
const importExcel = require('./importExcel')

exports.main = () => {
  exportJson.makeXlsFromJson('/src/lang/', 'ko.js', '.')
  // importExcel.makeJsonFromXls('./src/files/', 'Vmaker_언어프로퍼티_정리_20200730_(dev).xlsx', '.')
}
