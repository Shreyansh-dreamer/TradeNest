const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
}, {
  timestamps: { createdAt: true, updatedAt: false }
});


module.exports = { OrdersSchema };