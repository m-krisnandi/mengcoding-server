module.exports = {
    index: async (req, res) => {
        try {
            res.render('admin/dashboard/view_dashboard')
        } catch (err) {
            console.log(err);
        }
    }
}