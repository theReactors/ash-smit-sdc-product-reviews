const fs = require('fs')
const faker = require('faker')

const content = 10000000 //10000000
const filename = 'products.csv'
const stream = fs.createWriteStream(filename)

const createProductData = () => {
  const imageURL = faker.image.image()
  const color = faker.internet.color()

  return `${imageURL},${color}\n`
}


const startWriting = (writeStream, encoding, done) => {
  let i = content
  function writing(){
    let canWrite = true
    do {
      i--
      let data = createProductData()
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

stream.write(`imageURL,color\n`, 'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})