const mongoose = require('mongoose');

let tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama tag harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tag', tagSchema);
