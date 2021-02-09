const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: '18.191.151.153',
  database: 'reviews',
  port: 5432,
});

pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

var seedDatabase = () => {
  pool.query(

    `COPY product (imageURL, color) FROM '/home/ubuntu/products.csv'DELIMITER ',' CSV HEADER;
    `).catch(e => {console.log(e)});

    pool.query(`COPY review (username, avatar, favorites, body, created, productID) FROM '/home/ubuntu/reviews.csv' DELIMITER ',' CSV HEADER;`).catch(e => {console.log(e)});

}

seedDatabase()

var getReviews = (index, callback) => {
  pool.query(`select * from review left join product on productID = product.id where review.productID = ${index}`, callback);
}

module.exports = {
  getReviews: getReviews
}