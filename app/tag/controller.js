const Tag = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const tag = await Tag.find();
      res.render('admin/tag/view_tag', {
        tag,
        alert,
        name: req.session.user.name,
        title: 'Halaman tag',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/tag/create', {
        name: req.session.user.name,
        title: 'Halaman tambah tag',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name} = req.body;
      let tag = await Tag({name});
      await tag.save();

      req.flash('alertMessage', 'Berhasil tambah tag');
      req.flash('alertStatus', 'success');
      res.redirect('/tag');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const tag = await Tag.findOne({_id: id});
      res.render('admin/tag/edit', {
        tag,
        name: req.session.user.name,
        title: 'Halaman ubah tag'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {name} = req.body;
      await Tag.findOneAndUpdate({_id: id}, {name});

      req.flash('alertMessage', 'Berhasil ubah tag');
      req.flash('alertStatus', 'success');
      res.redirect('/tag');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      await Tag.findOneAndRemove({_id: id});

      req.flash('alertMessage', 'Berhasil hapus tag');
      req.flash('alertStatus', 'success');
      res.redirect('/tag');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/tag');
    }
  }
};
