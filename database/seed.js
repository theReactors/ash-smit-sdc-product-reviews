const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'inferno',
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

    `COPY product (imageURL, color) FROM '/Users/aisling/hello/ash-smit-sdc-product-reviews/database/products.csv'DELIMITER ',' CSV HEADER;
    `).catch(e => {console.log(e)});

    pool.query(`COPY review (username, avatar, favorites, body, created, productID) FROM '/Users/aisling/hello/ash-smit-sdc-product-reviews/database/reviews.csv' DELIMITER ',' CSV HEADER;`).catch(e => {console.log(e)});

  // copy product from products.csv  . then copy review from reviews.csv
}

// seedDatabase()

var getReviews = (index, callback) => {
  pool.query(`select * from review left join product on productID = product.id where review.productID = ${index}`, callback);
}

module.exports = {
  getReviews: getReviews
}