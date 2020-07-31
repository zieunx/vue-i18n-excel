const xlsx = require('xlsx')
const savePath = './src/result/'

exports.makeJsonFromXls = async (relativePath, excelFileName, separator) => {
  const excelFile = await xlsx.readFile(relativePath + excelFileName)

  // console.log(excelFile.Sheets)
  const totalJson = await makeJson(excelFile.Sheets)
  jsonToLangFile(separator, totalJson)
}


const makeJson = async (sheets) => {
  const sheetNames = Object.keys(sheets).sort()
  const currentSheet = sheets[sheetNames[0]]

  let cells = Object.keys(currentSheet)
  cells = cells.filter(cell => !cell.includes('!'))

  let totalLangJson = await getTotalLangJson(currentSheet, cells)
  console.log(totalLangJson)

  return totalLangJson
}

const jsonToLangFile = (separator, totalLangJson) => {
  Object.keys(totalLangJson).forEach(langFileName => {
    const file = savePath + langFileName + '.js'
    console.log(file)
    try {
      fs.writeFile(savePath + langFileName + '.js', 'export default test', err => {
        if (err) {
          console.log('!!!!!!! 에러 발생 1 !!!!!!!')
          console.log(err)
        } else {
          console.log('성공')
        }
      })
    } catch (e) {
      console.log('!!!!!!! 에러 발생 2 !!!!!!!')
    }
  })
}

const getTotalLangJson = async (currentSheet, cells) => {
  const defaultCell = await getDefaultCell(currentSheet, cells, 'property')
  const defaultCol = getRegExpAlphabet(defaultCell)
  const defaultRow = getRegExpNumber(defaultCell)
  let cols = await getCols(cells)
  let rows = await getRows(cells)
  cols = cols.slice(cols.indexOf(defaultCol) + 1)
  rows = rows.slice(rows.indexOf(defaultRow) + 1)

  let totalLangJson = {}
  for (const currentCol of cols) {
    const fileNameRow = Number(rows[0]) - 1
    console.log(currentSheet[currentCol + fileNameRow].v)
    const fileName = currentSheet[currentCol + fileNameRow].v
    totalLangJson[fileName] = getLangJson(currentSheet, defaultCol, currentCol, rows)
  }
  return totalLangJson
}

const getLangJson = (currentSheet,defaultCol, currentCol, rows) => {
  const json = {}
  for (const row of rows) {
    const defaultCell = defaultCol + row.toString()
    const cell = currentCol + row.toString()
    // console.log(cell)
    // console.log(currentSheet[cell].v)
    // console.log('------------------------')
    json[currentSheet[defaultCell].v] = currentSheet[cell].v
  }
  return json
}

const getDefaultCell = (currentSheet, cells, defaultValue) => {
  let defaultCell = ''
  for (const cell of cells) {
    if (currentSheet[cell].v === defaultValue) {
      defaultCell = cell
      break
    }
  }
  return defaultCell
}

const getCols = (cellLocations) => {
  let cols = []
  for (const cell of cellLocations) {
    cols.push(getRegExpAlphabet(cell))
  }
  return Array.from(new Set(cols)).sort()
}

const getRows = (cellLocations) => {
  let rows = []
  for (const cell of cellLocations) {
    rows.push(getRegExpNumber(cell))
  }
  return Array.from(new Set(rows)).sort((a, b) => {numberSort(a, b)})
}

const numberSort = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

const getRegExpAlphabet = (string) => {
  return string.replace(new RegExp('[(0-9)]', 'gi'), '')
}

const getRegExpNumber = (string) => {
  return string.replace(new RegExp('[^(0-9)]', 'gi'), '')
}
