const fs = require('fs')

const currentPath = process.cwd()
const langList = []

const ERROR_READ_DIR_FILE = '디렉토리의 파일을 읽는데 실패하였습니다.'

exports.findFileFromPath = () => {
  const relativePath = '/src/lang/'
  console.log(process.cwd() + relativePath)
  fs.readdir(currentPath + relativePath, function (error, fileList) {
    if (fileList) {
      fileList
        .filter(f => f.indexOf('index') == -1 || !f)
        .forEach(fileName => {
          readFile(currentPath + relativePath + fileName)
        })
    } else {
      console.log(ERROR_READ_DIR_FILE)
    }
  })
}

const readFile = (pathFileName) => {
  const jsonLang = require(pathFileName)
  // langList.push(jsonLang)
  refactoring(jsonLang)
}

const refactoring = (jsonLang) => {
  const refactoringLang = {}
  // console.log(jsonLang)
  Object.keys(jsonLang).forEach(k => {
    console.log('>>>>> 키값 : '+k + ', 데이터값 : ' + Object.keys(jsonLang[k]));
  })
}
