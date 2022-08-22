const mongoose = require('mongoose');

let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama category harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
