// require('dotenv').config();
const express = require('express');
const passport = require('./configs/passport.config');

const port = process.env.PORT;
const app = express();

console.log(process.env);

require('./configs/mongo.config');

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/api', require('./routes/index.routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
