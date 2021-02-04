const { Client } = require('pg');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'inferno',
  port: 5432,
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})


client.query(

  `COPY product (imageURL, color) FROM '/Users/aisling/hello/ash-smit-sdc-product-reviews/database/products.csv'DELIMITER ',' CSV HEADER;
  `).catch(e => {console.log(e)});

  client.query(`COPY review (username, avatar, favorites, body, created, productID) FROM '/Users/aisling/hello/ash-smit-sdc-product-reviews/database/reviews.csv' DELIMITER ',' CSV HEADER;`).catch(e => {console.log(e)});

// copy product from products.csv  . then copy review from reviews.csv