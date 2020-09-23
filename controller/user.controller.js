const User = require("../models/user.model");

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  list: (req, res) => {
    User.find({}, (err, roles) => {
      if (err) {
        res.json(err);
      }
      res.json(roles);
    });
  },

  register: (req, res) => {
    User.register(
      new User({
        username: req.body.username,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      }),
      req.body.password
    )
      .then(() =>
        res.json({
          success: "Sikeres regisztráció",
        })
      )
      .catch((err) => res.send(err));
  },

  login: (req, res) =>
    res.json({
      success: "Sikeres belépés",
    }),

  logout: (req, res) => {
    req.logout();
    res.json({
      success: "Sikeres kilépés",
    });
  },

  updateProfile: (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.json(user);
        }
      }
    );
  },

  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(data);
      }
    });
  },

  changePass: (req, res) => {
    if (req.user) {
      if (req.user["_id"] == req.params.id) {
        User.findById(req.params.id).then((user) => {
          user.changePassword(
            req.body.oldPassword,
            req.body.newPassword,
            (passwordErr) => {
              if (passwordErr) {
                res.status(401).json({ err: "Rossz jelszó" });
              } else {
                user.save();
                res
                  .status(200)
                  .json({ success: "Jelszó sikeresen megváltozott" });
              }
            }
          );
        });
      } else {
        res.status(403).json({ err: "Tiltott művelet" });
      }
    } else {
      res.status(401).json({ err: "Nincs bejelentkezve" });
    }
  },
};
