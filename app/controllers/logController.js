require("dotenv").config();

const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

const logController = {
  /*-----------------------|---------------|-------------------------*/
  /*                       | LOGIN SECTION |                        */
  /*-----------------------|---------------|-----------------------*/

  showLoginPage(_, res) {
    return res.render("login");
  },

  async login(req, res) {
    try {
      const { email, mdp } = req.body;

      // retrieval of the user's login email
      const user = await Users.findAll({
        include: [{ association: "animals" }],
        where: {
          email: email,
        },
      });
      // console.log("user", user)

      const getUsers = await Users.findAll({
        attributes: ["email"],
      });
      // I create a table and I push the user.emil to recover
      const emailUserList = [];

      for (const getUser of getUsers) {
        emailUserList.push(getUser.email);
      }
      // console.log(emailUserList)

      // if the conditions of the form are not met, I return an error on the form
      if (email === "" || mdp === "") {
        // || req.body.passwordConfirm === ""

        return res.render("login", {
          error1: "Merci de remplir les champs obligatoires *",
        });
      }

      if (emailUserList.includes(email)) {
        // I compare the code entered in the from with the hashed one
        const validPass = bcrypt.compareSync(mdp, user[0].mdp);

        // if the hashed password is different from the confirmation password then I render error
        if (validPass) {
          req.session.user = user;
          // console.log(req.session.user[0].img)
          return res.redirect("/");
        } else {
          return res.render("login", {
            error3: "identifiant ou mot de passe erroné",
          });
        }
      } else {
        return res.render("login", {
          error3: "identifiant ou mot de passe erroné ",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  logout(req, res) {
    // destroy session ( rien d'important n'est stocké )
    req.session.destroy();
    return res.redirect("/");
  },

  error404(req, res) {
    res.status(404).render("error404", {
      url: req.url,
    });
  },

  /*-----------------------|---------------|-------------------------*/
  /*                       |    REGISTER   |                        */
  /*-----------------------|---------------|-----------------------*/

  showRegisterPage(_, res) {
    return res.render("register");
  },

  async registerUser(req, res) {
    try {
      const { nom, prenom, email, mdp, passwordConfirm } = req.body;

      if (mdp === "") {
        return res.render("register", {
          error1: "Veillez remplir les champs obligatoires",
        });
      }

      // retrieval of the user's login email
      const user = await Users.findAll({
        include: [{ association: "animals" }],
        where: {
          email: email,
        },
      });

      const getUsers = await Users.findAll({
        attributes: ["email"],
      });
      // I create a table and I push the user.emil to recover
      const emailUserList = [];

      for (const getUser of getUsers) {
        emailUserList.push(getUser.email);
      }

      if (emailUserList.includes(req.body.email)) {
        return res.render("register", {
          error3: "Email non disponible",
        });
      } else {
        if (mdp !== passwordConfirm) {
          return res.render("register", {
            error2: "Les mots de passe ne correspondent pas",
          });
        } else {
          // I hash the password when registering from
          const hashedPass = bcrypt.hashSync(mdp, 10);

          // I insert in the database the form info + the hashed password
          await Users.create({
            email,
            mdp: hashedPass,
            nom,
            prenom,
          });

          // req.session.user = user;
          // console.log(req.session.user)

          return res.redirect("/login");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};
module.exports = logController;
