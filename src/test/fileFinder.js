const fs = require('fs')
const dataRefactoring = require('./dataRefactoring')

const currentPath = process.cwd()

const ERROR_READ_DIR_FILE = '디렉토리의 파일을 읽는데 실패하였습니다.'
const ERROR_NO_FILE_IN_DIR = '디렉토리에 파일이 없습니다.'



exports.makeJsonForXls = (relativePath) => {
  findFileFromPath(relativePath)
}

const findFileFromPath = (relativePath) => {
  let list = []
  try {
    fs.readdir(currentPath + relativePath, (error, fileList) => {
      if (!fileList) {
        console.log(ERROR_NO_FILE_IN_DIR)
        return
      }
      fileList
        // .filter(f => f.indexOf('index') == -1 || !f)
        .filter(f => f.indexOf('en') > -1 || !f)
        .forEach(fileName => {
          readFile(currentPath + relativePath, fileName)
        })
    })
  } catch (e) {
    console.log(ERROR_READ_DIR_FILE)
    console.log(e)
  }
  return list
}

const readFile = (totalPath, fileName) => {
  const langCode = require(totalPath + fileName)
  // langList.push(jsonLang)
  dataRefactoring.refactoring(fileName, langCode, '/')
}
