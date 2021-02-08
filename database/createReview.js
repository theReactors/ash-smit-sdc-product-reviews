const fs = require('fs')
const faker = require('faker')
const moment = require('moment')

const content = 20000000 //50000000
const filename = 'reviews.csv'
const stream = fs.createWriteStream(filename)

var newDate = function () {
  // Creates a random date between a random date 2 years ago and a recent date, and converts it to Year-Month-Day for Mongoose sorting. Like 2021-01-05 \.
  var pastDate = faker.date.past(2);
  var recentDate = faker.date.recent();
  var date = faker.date.between(pastDate, recentDate);
  return moment(date).format("YYYY-MM-DD");
}

const createReviewData = () => {
  const userName = faker.internet.userName()
  const avatar = faker.internet.avatar()
  const favorites = faker.random.number(10)
  const body = faker.lorem.paragraph()
  const date = newDate()
  const productID = faker.random.number(10000001)

  return `${userName},${avatar},${favorites},${body},${date},${productID}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = content
  function writing(){
    let canWrite = true
    do {
      i--
      let data = createReviewData()
      if(i === 0){
        writeStream.write(data, encoding, done)
      }else{
        writeStream.write(data, encoding)
      }
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }
  writing()
}

stream.write(`userName,avatar,favorites,body,date,productID\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})