const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const extensionSchema = mongoose.Schema({
	nom: { type: String, required: true },
	nbCarteTotal: { type: Number, required: true },
	nbCarte: { type: Number, required: true },
	image: { type: String, required: false },
	carte: { type: Array, required: true },
})

module.exports = mongoose.model("Extension", extensionSchema)
