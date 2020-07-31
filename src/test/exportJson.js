const fs = require('fs')
const moment = require('moment')
const excel = require('excel4node')
const dataRefactoring = require('./dataRefactoring')

const currentPath = process.cwd()

const defaultFileName = 'excel-download'
const defaultFileType = '.xlsx'
const defaultSheetName = 'sheet 1'

const ERROR_READ_DIR_FILE = '디렉토리의 파일을 읽는데 실패하였습니다.'
const ERROR_NO_FILE_IN_DIR = '디렉토리에 파일이 없습니다.'
const ERROR_READ_FILE = '파일의 내용을 읽는데 실패하였습니다.'
const ERROR_DEFAULT_JSON = 'default JSON을 만드는데 실패했습니다.'
const ERROR_WORKBOOK_WRITE = 'work-book.write() 실행 중 에러가 발생하였습니다.'



exports.makeXlsFromJson = async (relativePath, primaryFileName, separator) => {
  const fileNames = await findFileNamesFromPath(relativePath)
  const jsonAboutLang = await filesToJsonAboutLang(relativePath, fileNames, separator)
  const resultJson = await jsonForXls(primaryFileName, jsonAboutLang)
  resultJson.fileName = 'Vmaker_언어프로퍼티_정리'
  resultJson.sheetName = 'Vmaker language'
  await exportExcel(resultJson)
}

const findFileNamesFromPath = async (relativePath) => {
  let list = []
  try {
    list = fs.readdirSync(currentPath + relativePath)
    if (!list) {
      throw new Error(ERROR_NO_FILE_IN_DIR)
    }
  } catch (e) {
    console.log(ERROR_READ_DIR_FILE)
  }
  // await fs.readdir(currentPath + relativePath, (error, fileList) => {
  //   if (!fileList) {
  //     console.log(ERROR_NO_FILE_IN_DIR)
  //     return
  //   }
  //   list = fileList
  // })
  // await fs.readdir(currentPath + relativePath, (error, fileList) => {
  //   if (!fileList) {
  //     console.log(ERROR_NO_FILE_IN_DIR)
  //     return
  //   }
  //   list = fileList
  // })
  return list
}

const filesToJsonAboutLang = async (relativePath, fileNames, separator) => {
  let jsonForXls = {}
  fileNames = fileNames.filter(f => f.indexOf('index') == -1 || !f)

  for (const fileName of fileNames) {
    let fileCode = await readFile(currentPath + relativePath, fileName)
    let refactoringCode = await dataRefactoring.refactoring(fileName, fileCode, separator)
    jsonForXls[fileName] = refactoringCode
  }
  return jsonForXls
}

// fileNames
//   .filter(f => f.indexOf('index') == -1 || !f)
//   // .filter(f => f.indexOf('en') > -1 || !f)
//   .forEach(async fileName => {
//     let fileCode = await readFile(currentPath + relativePath, fileName)
//     let refactoringCode = await dataRefactoring.refactoring(fileName, fileCode, '/')
//     jsonForXls[fileName] = refactoringCode
//   })

const readFile = (totalPath, fileName) => {
  let fileCode = {}
  try {
    fileCode = require(totalPath + fileName)
  } catch (e) {
    console.log(ERROR_READ_FILE)
    console.log(e)
  }
  return fileCode
}

const jsonForXls = async (primaryFileName, jsonAboutLang) => {
  let makeJson = {
    fileName: '',
    sheetName: '',
    cols: [],
    rows: []
  }
  try {
    const excludeFileNames = Object.keys(jsonAboutLang)
    excludeFileNames.splice(excludeFileNames.indexOf(primaryFileName), 1)
    console.log(excludeFileNames)

    makeJson.cols = await makeCols(primaryFileName, excludeFileNames)
    makeJson.rows = await makeRows(jsonAboutLang, primaryFileName, excludeFileNames)
  } catch (e) {
    console.log(ERROR_DEFAULT_JSON)
    console.log(e)
  }

  return makeJson
}

const makeCols = (primaryFileName, excludeFileNames) => {
  const cols = []
  cols.push('property')
  cols.push(primaryFileName)
  for (const langName of excludeFileNames){
    cols.push(langName)
  }
  return cols
}

const makeRows = (jsonAboutLang, primaryFileName, excludeFileNames) => {
  const rows = []
  const primaryLangJson = jsonAboutLang[primaryFileName]
  for (const property of Object.keys(primaryLangJson)) {
    const rowValue = []
    rowValue.push(property)
    rowValue.push(primaryLangJson[property])
    // property
    // primaryLang
    for (const langName of excludeFileNames) {
      rowValue.push(jsonAboutLang[langName][property] ? jsonAboutLang[langName][property] : '')
    }
    rows.push(rowValue)
  }
  return rows
}

const exportExcel = async (conf) => {
  const workbook = new excel.Workbook()

  const fileName = (conf.fileName ? conf.fileName : defaultFileName) +
    '_' +
    moment(moment.now()).format('YYYYMMDD') +
    '_' +
    moment(moment.now()).format('HHmmss') +
    defaultFileType

  const sheetName = conf.sheetName ? conf.sheetName : defaultSheetName

  const worksheet = workbook.addWorksheet(sheetName)

  const colStyle = workbook.createStyle({
    font: {
      color: '#cb051a',
      size: 12
    }
  })
  const rowStyle = workbook.createStyle({
    font: {
      color: '#323232',
      size: 10
    }
  })

  // col setting
  await conf.cols.forEach((col, index) => {
    worksheet.cell(1, index + 1).string(col).style(colStyle)
  })
  // col setting
  await conf.rows.forEach((row, rowsIndex) => {
    row.forEach((val, valIndex) => {
      worksheet.cell(rowsIndex + 2, valIndex + 1).string(val).style(rowStyle)
    })
  })
  try {
    workbook.write(fileName)
  } catch (e) {
    console.log(ERROR_WORKBOOK_WRITE)
    console.log(e)
  }
}
