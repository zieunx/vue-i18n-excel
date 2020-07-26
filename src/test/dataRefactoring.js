
let langJson = {}
let refactoringCode = {}

const ERROR_MAKE_PROPERTY = '프로퍼티를 만드는데 실패하였습니다.'

exports.refactoring = (fileName, langCode, separator) => {
  langCode = langCode.default

  console.log('\n')
  console.log('[ ' + fileName + ']\n')

  refactoringCode = {}
  makeContents(langCode, separator)
  // console.log('============================ 결과 ================================')
  // console.log(refactoringCode)
  // langJson[fileName] = contents
  return refactoringCode
}

const makeContents = (langCode, separator) => {
  try {
    callContent('', langCode, separator)
  } catch (e) {
    console.error(ERROR_MAKE_PROPERTY)
    console.error(e)
  }
}

const callContent = (parentKey, langCode, separator) => {
  Object.keys(langCode).forEach(key => {
    let newKey = parentKey + separator + key
    if (!parentKey) {
      newKey = key
    }
    if (typeof langCode[key] === "object") {
      callContent(newKey, langCode[key], separator)
    } else {
      addProperty(newKey, langCode[key])
    }
  })
}

const addProperty = (property, value) => {
  refactoringCode[property] = value
}

