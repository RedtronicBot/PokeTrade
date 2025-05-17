const mongoose = require("mongoose")

/*Création du Schéma pour l'utilisateur*/
const userSchema = mongoose.Schema({
	nom: { type: String, required: true },
	avatar_url: { type: String, required: true },
	id: { type: String, required: true },
	extension: [
		{
			idExtension: { type: mongoose.Schema.Types.ObjectId, ref: "IdExtension", required: true },
			carte: { type: Array, required: true },
		},
	],
	admin: { type: Boolean, required: true },
})

module.exports = mongoose.model("User", userSchema)
