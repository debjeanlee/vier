const Category = require('../server/models/category.models');
const Table = require('../server/models/table.models');

require('dotenv').config();
require('../server/config/mongo.config');

Category.insertMany([
  { name: 'Starters' },
  { name: 'Steak' },
  { name: 'Combo' },
  { name: 'Seafood' },
  { name: 'Poultry' },
  { name: 'Pasta/Asian' },
  { name: 'Desserts' },
])
  .then(() => {
    console.log('successfully added!');
  })
  .catch((e) => {
    console.log(e);
  });

Table.insertMany([
  { tableNo: 1 },
  { tableNo: 2 },
  { tableNo: 3 },
  { tableNo: 4 },
  { tableNo: 5 },
  { tableNo: 6 },
  { tableNo: 7 },
  { tableNo: 8 },
  { tableNo: 9 },
  { tableNo: 10 },
])
  .then(() => {
    console.log('Tables added successfully');
  })
  .catch((e) => {
    console.log(e);
  });
