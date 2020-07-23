const app = require('../test/app')

exports.cli = () => {
  const command = process.argv[1]
  // logger.debug('>>>>>>>>> cli start');
  console.log('>>>>>>>>> cli start')

  if(command === 'token') {
    console.log('token')
  } else {
    app.main()
  }
}
