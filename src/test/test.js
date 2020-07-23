// test라는 모듈을 만들어 본다.
const test = {}

test.helloWorld = function helloWorld() {
  console.log('Hello world!')
}

test.helloNode = function helloNode() {
  console.log('Hello Node!')
}

module.exports = test
