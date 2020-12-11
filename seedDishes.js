const data = require('./data/data.json');
const Dish = require('./server/models/dish.models');

require('dotenv').config();
require('./server/configs/mongo.config');

const starterData = data.data[0];
const steakData = data.data[1];
const comboData = data.data[2];
const seafoodData = data.data[3];
const poultryData = data.data[4];
const pastaData = data.data[5];
const dessertData = data.data[6];

starterData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b773';
});

steakData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b774';
});

comboData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b775';
});

seafoodData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b776';
});

poultryData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b777';
});

pastaData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b778';
  if (el.price == null) {
    el.price = '$13';
  }
});

dessertData.forEach((el) => {
  el.category = '5fcf65ee6ec138fce0a4b779';
});

Dish.insertMany(starterData)
  .then(() => console.log('Starters added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(steakData)
  .then(() => console.log('Steak added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(comboData)
  .then(() => console.log('Combos added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(seafoodData)
  .then(() => console.log('Seafood added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(poultryData)
  .then(() => console.log('Poultry added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(pastaData)
  .then(() => console.log('Pasta added successfullly'))
  .catch((e) => console.log(e));

Dish.insertMany(dessertData)
  .then(() => console.log('Dessert added successfullly'))
  .catch((e) => console.log(e));
