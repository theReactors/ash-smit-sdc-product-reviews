const axios = require('axios')


axios({
  method: 'get',
  url: 'http://localhost/reviews/5000'

}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})