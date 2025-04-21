const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const rareteSchema = mongoose.Schema({
	nom: { type: String, required: true },
	url: { type: String, required: true },
})

module.exports = mongoose.model("Rarete", rareteSchema)
