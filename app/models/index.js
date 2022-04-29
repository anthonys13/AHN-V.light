const Users = require("./Users");
const Animals = require("./Animals");
const Particular = require("./Particular");
const Vac = require("./Vac");
const Vet = require("./Vet");
const Role = require("./Role");

Users.hasMany(Animals, {
  foreignKey: "users_id",
  as: "animals",
});

Animals.hasOne(Users, {
  foreignKey: "id",
  as: "user",
});

Animals.hasMany(Particular, {
  foreignKey: "animal_id",
  as: "particulars",
});

Particular.hasOne(Animals, {
  foreignKey: "id",
  as: "particular_note",
});

Animals.hasMany(Vac, {
  foreignKey: "animal_id",
  as: "Vacs",
});

Vac.hasOne(Animals, {
  foreignKey: "id",
  as: "Vac_note",
});

Animals.hasMany(Vet, {
  foreignKey: "animal_id",
  as: "Vets",
});

Vet.hasOne(Animals, {
  foreignKey: "id",
  as: "Vet_note",
});

Users.belongsToMany(Role, {
  as: 'role',
  through: 'user_has_role',
  foreignKey: 'users_id',
  otherkey: 'role_id',
});

Role.belongsToMany(Users, {
  as: 'user_role',
  through: 'user_has_role',
  foreignKey: 'role_id',
  otherkey: 'users_id',
})

module.exports = {
  Users,
  Animals,
  Particular,
  Vac,
  Vet,
};