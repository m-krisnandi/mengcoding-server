const mongoose = require('mongoose');

let seriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama series harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Series', seriesSchema);
