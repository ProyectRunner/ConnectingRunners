module.exports = {
  signup: (req, res, next) => {
    res.render('events/create');
  },
  login: (req, res) => {
      res.render('auth/login');
  },
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  }
};
