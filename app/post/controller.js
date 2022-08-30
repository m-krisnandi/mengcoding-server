const Post = require('./model');
const Category = require('../category/model');
const Series = require('../series/model');
const Tag = require('../tag/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const post = await Post.find()
        .populate('category')
        .populate('series')
        .populate('tags')
        .populate('user');
      res.render('admin/post/view_post', {
        post,
        alert,
        name: req.session.user.name,
        title: 'Halaman post',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const series = await Series.find();
      const tag = await Tag.find();
      res.render('admin/post/create', {
        category,
        series,
        tag,
        name: req.session.user.name,
        title: 'Halaman tambah post',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { title, content, category, series,  minRead, tags, publish } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const post = new Post({
              title,
              category,
              series,
              content,
              minRead,
              tags,
              publish,
              thumbnail: filename,
            });

            await post.save();
            req.flash('alertMessage', 'Berhasil tambah post');
            req.flash('alertStatus', 'success');
            res.redirect('/post');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/post');
          }
        });
      } else {
        const post = new Post({
          title,
          category,
          series,
          content,
          minRead,
          tags,
          publish
        });

        await post.save();
        req.flash('alertMessage', 'Berhasil tambah post');
        req.flash('alertStatus', 'success');
        res.redirect('/post');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const series = await Series.find();
      const tag = await Tag.find();
      const post = await Post.findOne({ _id: id })
        .populate('category')
        .populate('series')
        .populate('tags');
      res.render('admin/post/edit', {
        post,
        category,
        series,
        tag,
        name: req.session.user.name,
        title: 'Halaman ubah post',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, category, series, minRead, tags, publish } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const post = await Post.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${post.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Post.findOneAndUpdate(
              {
                _id: id,
              },
              {
                title,
                category,
                series,
                content,
                minRead,
                tags,
                publish,
                thumbnail: filename,
              }
            );
            req.flash('alertMessage', 'Berhasil ubah post');
            req.flash('alertStatus', 'success');
            res.redirect('/post');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/post');
          }
        });
      } else {
        await Post.findOneAndUpdate(
          {
            _id: id,
          },
          {
            title,
            category,
            series,
            content,
            minRead,
            tags,
            publish
          }
        );
        req.flash('alertMessage', 'Berhasil ubah post');
        req.flash('alertStatus', 'success');
        res.redirect('/post');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  },

  actionDelete: async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findOneAndRemove({_id: id});
        let currentImage = `${config.rootPath}/public/uploads/${post.thumbnail}`;
        if(fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }

        req.flash('alertMessage', 'Berhasil hapus post');
      req.flash('alertStatus', 'success');
      res.redirect('/post');
    } catch (err) {
        req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/post');
    }
  }
};
