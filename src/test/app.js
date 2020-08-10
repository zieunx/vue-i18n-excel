#!usr/bin/env node

const exportJson = require('./exportJson')
const importExcel = require('./importExcel')
const path = require('path')
const Progress = require('progress'),
  bar = new Progress('running [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 1
  })

exports.main = () => {
  const command = process.argv[2]
  // console.log(process.argv)
  console.log(process.env['HOME'])
  console.log(path.join(process.env['HOME'], "/"))
  // console.log(global)
  // return

  // json to excel
  if (command === 'export') {
    console.log('[export] language json to excel')
    // 실행
    if(!process.argv[3]) {
      console.log(' * json to excel')
      exportJson.makeXlsFromJson('/src/lang/', 'ko.js', '.').then(() => {
        console.log('success')
      })
      return
    }
    // 설정
    const config = process.argv[3]
    if (config === '--path') {

    }
  } else if (command === 'import') {
    console.log('[import] language excel to json')
    importExcel.makeJsonFromXls('./src/files/', 'Vmaker_언어프로퍼티_정리_20200730_(dev).xlsx', '.')
  }
  // console.log(global)
  // exportJson.makeXlsFromJson('/src/lang/', 'ko.js', '.')
}
