require("dotenv").config();
var dayjs = require("dayjs");
dayjs.locale("fr");

const { Animals, Users } = require("../models/index.js");

const mainController = {
  /*-----------------------|---------------|-------------------------*/
  /*                       |    Accueil    |                        */
  /*-----------------------|---------------|-----------------------*/

  async homePage(req, res) {
    try {
      // console.log(req.session.user[0].email);

      const userID = req.session.user[0].id;
      // console.log(userID)

      return res.render("home");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  /*-----------------------|---------------|-------------------------*/
  /*                       |    Carnet     |                        */
  /*-----------------------|---------------|-----------------------*/
  async carnetPage(req, res) {
    try {
      // I get the id from the url
      const animalUrlId = Number(req.params.id);

      const getMyIdAnimals = await Animals.findAll({
        raw: true,
        include: [{ association: "user" }],
        where: {
          users_id: req.session.user[0].id,
        },
      });
      // console.log('getMyIdAnimals', getMyIdAnimals);

      // I create a table and I insert the values ​​to check if the id of the url belongs to the correct client connected
      const arrayForgetMyIdAnimals = [];

      getMyIdAnimals.forEach((element) => {
        arrayForgetMyIdAnimals.push(element.id);
        // console.log('arrayForgetMyIdAnimals', arrayForgetMyIdAnimals);
      });

      if (arrayForgetMyIdAnimals.includes(animalUrlId)) {
        // I display an article according to the url
        const currentAnimal = await Animals.findAll({
          where: {
            id: animalUrlId,
          },
        });
        // console.log(currentAnimal);

        // I want to transform the date format displayed by the European one
        const currentAge = currentAnimal[0].age;

        const formatAge = dayjs(currentAge).format("DD/MM/YYYY");
        // console.log(formatAge);

        const particularsAnimal = await Animals.findAll({
          raw: true,
          include: [{ association: "particulars" }],
          where: {
            id: animalUrlId,
          },
        });
        // console.table(particularsAnimal);

        const vetAnimal = await Animals.findAll({
          raw: true,
          include: [{ association: "Vets" }],
          where: {
            id: animalUrlId,
          },
        });
        // console.table(particularsAnimal);

        // I want to transform the date format displayed by the European one
        const currentVet = vetAnimal[0]["Vets.date"];

        const formatVet = dayjs(currentVet).format("DD/MM/YYYY");
        // console.log(formatVet);

        const vacAnimal = await Animals.findAll({
          raw: true,
          include: [{ association: "Vacs" }],
          where: {
            id: animalUrlId,
          },
        });
        // console.table(particularsAnimal);

        // I want to transform the date format displayed by the European one
        const currentVac = vacAnimal[0]["Vacs.date"];

        const formatVac = dayjs(currentVac).format("DD/MM/YYYY");
        // console.log(formatVac);

        const rappelVac = vacAnimal[0]["Vacs.rappel"];

        const formatRappelVac = dayjs(rappelVac).format("DD/MM/YYYY");
        // console.log(formatRappelVac);

        return res.render("carnet", {
          vacAnimal,
          vetAnimal,
          particularsAnimal,
          currentAnimal,
          formatAge,
          formatVac,
          formatRappelVac,
          formatVet,
        });
      } else {
        res.status(404).render("error404", {
          url: req.url,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  /*-----------------------|---------------|-------------------------*/
  /*                       |    Profil     |                        */
  /*-----------------------|---------------|-----------------------*/
  async profilPage(req, res) {
    try {
      try {
        const userID = req.session.user[0].id;

        // Want to retrieve all animals to display them according to the logged in user
        const getMyAnimalsByUsers = await Animals.findAll({
          raw: true,
          include: [
            {
              association: "user",
            },
          ],
          where: {
            users_id: req.session.user[0].id,
          },
        });
        // console.log('getMyAnimalsByUsers', getMyAnimalsByUsers[0].img);
        // console.log('Lenght', getMyAnimalsByUsers.length);

        const getMyUser = await Users.findByPk(userID);
        // console.log('getMyUser', getMyUser.nom);

        return res.render("account", {
          getMyAnimalsByUsers,
          getMyUser,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
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

module.exports = mainController;
