const fs = require('fs')
const dataRefactoring = require('./dataRefactoring')

const currentPath = process.cwd()

const ERROR_READ_DIR_FILE = '디렉토리의 파일을 읽는데 실패하였습니다.'
const ERROR_NO_FILE_IN_DIR = '디렉토리에 파일이 없습니다.'
const ERROR_READ_FILE = '파일의 내용을 읽는데 실패하였습니다.'



exports.makeJsonForXls = async (relativePath, primaryFileName) => {
  const fileNames = await findFileNamesFromPath(relativePath)
  const jsonAboutLang = await filesToJsonAboutLang(relativePath, fileNames)
  // console.log(jsonAboutLang)
  Object.keys(jsonAboutLang).forEach(fileName => {
    console.log('========= file name : ' + fileName + '====================')
    console.log(jsonForXls[fileName])
  })
  // const jsonForXls = await jsonForXls(primaryFileName, jsonAboutLang)
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

const filesToJsonAboutLang = (relativePath, fileNames) => {
  let jsonForXls = {}
  fileNames
    .filter(f => f.indexOf('index') == -1 || !f)
    // .filter(f => f.indexOf('en') > -1 || !f)
    .forEach(async fileName => {
      let fileCode = await readFile(currentPath + relativePath, fileName)
      let refactoringCode = await dataRefactoring.refactoring(fileName, fileCode, '/')
      jsonForXls[fileName] = refactoringCode
    })
  // console.log('@@ ', jsonForXls)
  return jsonForXls
}

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

const jsonForXls = (primaryFileName, jsonAboutLang) => {
  // const primaryLang = jsonAboutLang[primaryFileName]
  // console.log('>>> ', Object.keys(jsonAboutLang))
  // Object.keys(primaryLang)
}
