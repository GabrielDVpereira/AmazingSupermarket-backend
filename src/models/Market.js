const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    thumbnail: String,
    category: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
  toJSON: {
    virtuals: true,
  },
});

MarketSchema.virtual('thumbnail_url').get(function() {
  const url = process.env.URL || 'http://localhost:3333'
  return `${url}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Market', MarketSchema );
