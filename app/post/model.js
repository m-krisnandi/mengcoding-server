const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

let postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Judul artikel harus diisi'],
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true
    },
    thumbnail: {
      type: String,
    },
    content: {
      type: String,
      require: [true, 'Content harus diisi'],
    },
    minRead: {
      type: String,
      require: [true, 'Minimal durasi baca harus diisi'],
    },
    publish: {
      type: Date,
      require: [true, 'Tanggal harus diisi']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Series',
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
