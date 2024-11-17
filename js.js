const ConvertHandler = require('./controllers/convertHandler')
const convertHandler = new ConvertHandler();

console.log(convertHandler.convert(10, 'L'));