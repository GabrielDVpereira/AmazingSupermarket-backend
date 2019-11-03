const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  thumbnail: String,
  name: String,
  price: String,
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Market'
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

ProductSchema.virtual('thumbnail_url').get(function() {
  const url = process.env.URL || 'http://localhost:3333'
  return `${url}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Booking', ProductSchema);
