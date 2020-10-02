import { Request, Response } from 'express';
import User from "../models/user.model";

const UserController = {
  profile: (req: Request, res: Response) => {
    res.json({
      user: req.user,
    });
  },

  list: (req: Request, res: Response) => {
    User.find({}, (err: Error, uesers: any[]) => {
      if (err) {
        res.json(err);
      }
      res.json(uesers);
    });
  },

  register: (req: Request, res: Response) => {
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
      .catch((err: Error) => res.send(err));
  },

  login: (req: Request, res: Response) =>
    res.json({
      success: "Sikeres belépés",
    }),

  logout: (req: Request, res: Response) => {
    req.logout();
    res.json({
      success: "Sikeres kilépés",
    });
  },

  updateProfile: (req: Request, res: Response) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err: Error, user: User) => {
        if (err) {
          res.send(err)
          console.log(err);
        } else {
          res.json(user);
        }
      }
    );
  },

  delete: (req: Request, res: Response) => {
    User.findByIdAndRemove(req.params.id, (err: Error, data: any) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(data);
      }
    });
  },

  changePass: (req: Request, res: Response) => {
    if (req.user) {
      if (req.user.id == req.params.id) {
        User.findById(req.params.id).then((user: User) => {
          user.changePassword(
            req.body.oldPassword,
            req.body.newPassword,
            (passwordErr: Error) => {
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

export default UserController;