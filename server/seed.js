require('dotenv').config();
require('./config/mongo.config');
const Category = require('./models/category.models');

Category.insertMany([{ name: 'Appetizers' }, { name: 'Mains' }])
  .then(() => {
    console.log('successfully added!');
  })
  .catch((e) => {
    console.log(e);
  });
