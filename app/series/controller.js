const Series = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const series = await Series.find();
      res.render('admin/series/view_series', {
        series,
        alert,
        name: req.session.user.name,
        title: 'Halaman series',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/series/create', {
        name: req.session.user.name,
        title: 'Halaman tambah series',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name} = req.body;
      let series = await Series({name});
      await series.save();

      req.flash('alertMessage', 'Berhasil tambah series');
      req.flash('alertStatus', 'success');
      res.redirect('/series');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const series = await Series.findOne({_id: id});
      res.render('admin/series/edit', {
        series,
        name: req.session.user.name,
        title: 'Halaman ubah series'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {name} = req.body;
      await Series.findOneAndUpdate({_id: id}, {name});

      req.flash('alertMessage', 'Berhasil ubah series');
      req.flash('alertStatus', 'success');
      res.redirect('/series');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      await Series.findOneAndRemove({_id: id});

      req.flash('alertMessage', 'Berhasil hapus series');
      req.flash('alertStatus', 'success');
      res.redirect('/series');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/series');
    }
  }
};
