require("dotenv").config();

var dayjs = require("dayjs");
dayjs.locale("fr");

const { Animals, Users } = require("../models/index.js");

const animalsController = {
  showAddAnimalPage(req, res) {
    return res.render("showAddAnimalPage");
  },

  async addAnimalPage(req, res) {
    try {
      // In the form of adding an animal, if the conditions below are not met, I render an error message. Otherwise I instantiate the values ​​of my req.body
      if (
        req.body.nom === "" ||
        req.body.poids === "" ||
        req.body.age === "" ||
        req.body.race === "" ||
        req.body.type === ""
      ) {
        return res.render("showAddAnimalPage", {
          error: "Veuillez compléter les champs requis *",
        });
      } else {
        const { nom, poids, age, race, type } = req.body;

        // console.log("Format date EU = ", age)
        const dateNow = new Date().toLocaleDateString();
        const bodyAge = dayjs(age).format("DD/MM/YYYY");

        if (bodyAge > dateNow) {
          return res.render("showAddAnimalPage", {
            error2: "Ton animal ne peut pas venir du futur !",
          });
        } else {
          const newAnimal = await Animals.create({
            nom: nom,
            poids: poids,
            age: age,
            race: race,
            type: type,
            users_id: req.session.user[0].id,
          });

          // console.log(newAnimal.id)

          // retrieval of the user's login email
          const user = await Users.findAll({
            include: [{ association: "animals" }],
            where: {
              id: req.session.user[0].id,
            },
          });
          // console.log("user", user)

          req.session.user = user;

          return res.render("showAddAnimalPage", {
            confirm: "Ton animal de compagnie est inscrit.",
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async deleteAnimalNote(req, res) {
    try {
      // I get the id from the url
      const noteID = Number(req.params.id);
      // console.log('noteID', noteID);

      const deleteAnimal = await Animals.destroy({
        where: {
          id: noteID,
        },
      });

      // retrieval of the user's login email
      const user = await Users.findAll({
        include: [{ association: "animals" }],
        where: {
          id: req.session.user[0].id,
        },
      });
      // console.log("user", user)

      req.session.user = user;

      return res.redirect("/profil");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  error404(req, res) {
    res.status(404).render("error404", {
      url: req.url,
    });
  },
};

module.exports = animalsController;
