const mongoose = require('mongoose');

const { Schema } = mongoose;

const tableSchema = new Schema({
  tableNo: { type: Number, required: true, unique: true },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
