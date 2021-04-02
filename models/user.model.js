const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  ssn: {
    type: Number, required: true, unique: true,
  },
  address: { type: String },
  phoneNumber: { type: Number },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
