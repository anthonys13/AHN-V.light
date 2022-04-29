require("dotenv").config();
const express = require("express");
const router = express.Router();

/**************************MONOLITHIQUE************************/
const mainController = require("./controllers/mainController");
const logController = require("./controllers/logController");
const animalsController = require("./controllers/animalsController");
const mailController = require("./controllers/mailController");

/**************************API************************/
const carnetControllerAPI = require("./controllers/API/carnetControllerAPI");

/**************************MIDDLEWARES************************/
const adminChecker = require("./middlewares/adminChecker");

/**************************REGISTER************************/

router.get("/register", logController.showRegisterPage);
router.post("/register", logController.registerUser);

/**************************LOGIN************************/

router.get("/login", logController.showLoginPage);
router.post("/login", logController.login);

router.get("/logout", logController.logout);

/**************************ACCUEIL************************/

router.get("/", adminChecker, mainController.homePage);
router.get("/carnet/:id", adminChecker, mainController.carnetPage);

/**************************PROFIL************************/
router.get("/profil", adminChecker, mainController.profilPage);

/**************************ANIMAL************************/

router.get("/addPage", adminChecker, animalsController.showAddAnimalPage);
router.post("/animal/add", adminChecker, animalsController.addAnimalPage);
router.get("/delete/:id", adminChecker, animalsController.deleteAnimalNote);

/**************************MODE API************************/

// router.get('/get/user', carnetControllerAPI.getUser);
router.patch("/edit/email/:id", carnetControllerAPI.editEmail);
router.patch("/edit/pass/:id", carnetControllerAPI.editPass);

/**************************SEND MAIL************************/

router.post("/send", mailController.sendEmail);

// Genere la page 404
router.use(mainController.error404);

module.exports = router;
