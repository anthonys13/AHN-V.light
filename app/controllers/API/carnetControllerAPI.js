require("dotenv").config();
var dayjs = require("dayjs");
dayjs.locale("fr");

const bcrypt = require("bcryptjs");
const { Users } = require("../../models/index");

const carnetControllerAPI = {
  async editEmail(req, res) {
    try {
      const userID = req.session.user[0].id;
      // console.log(userID);

      //  We retrieve the user we want to modify
      const user = await Users.findByPk(userID);
      // console.log('user =',user);

      const { email } = req.body;

      // We will check if sequelize has found a user with the corresponding id
      if (user) {
        const getUsers = await Users.findAll({
          attributes: ["email"],
        });
        // I create a table and I push the user.emil to recover
        const emailUserList = [];

        for (const getUser of getUsers) {
          emailUserList.push(getUser.email);
        }

        if (emailUserList.includes(email)) {
          return res.status(401).json({
            code: "doublon_email",
            message: "Email non disponible",
          });
        }

        if (!email) {
          return res.status(400).json({
            code: "missing_email",
            message: "Le champ email ne peut pas être vide",
          });
        }

        //  We update on our recovered user the information with the news
        //  values ​​(only if provided)
        if (email) {
          user.email = email;
        }

        await user.save();

        const userSession = await Users.findAll({
          include: [{ association: "animals" }],
          where: {
            email: email,
          },
        });

        req.session.user = userSession;

        res.json(user);
      } else {
        //  If not, we return a 404 response (resource not found) with a small
        // message that includes the id that is causing the problem
        res.status(404).json({
          code: "wrong_id",
          message: `Le user avec l'id ${userID} n'existe pas`,
        });
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  async editPass(req, res) {
    try {
      const userID = req.session.user[0].id;
      // console.log(userID);

      //  We retrieve the user we want to modify
      const user = await Users.findByPk(userID);
      // console.log('user =',user);

      const { mdp } = req.body;

      // We will check if sequelize has found a user with the corresponding id
      if (user) {
        if (!mdp) {
          return res.status(400).json({
            code: "missing_mdp",
            message: "Le champ mdp ne peut pas être vide",
          });
        }

        const hashedPass = bcrypt.hashSync(mdp, 10);

        //  We update on our recovered user the information with the news
        //  values ​​(only if provided)
        if (mdp) {
          user.mdp = hashedPass;
        }

        await user.save();

        res.json(user);
      } else {
        //  If not, we return a 404 response (resource not found) with a small
        // message that includes the id that is causing the problem
        return res.status(404).json({
          code: "wrong_id",
          message: `Le user avec l'id ${userID} n'existe pas`,
        });
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};
module.exports = carnetControllerAPI;
