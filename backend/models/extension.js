const mongoose = require("mongoose")

const extensionSchema = mongoose.Schema({
	nom: { type: String, required: true },
	nbCarteTotal: { type: Number, required: true },
	nbCarte: { type: Number, required: true },
	image: { type: String, required: false },
	tradable: { type: Boolean, required: false },
	carte: [
		{
			nom: { type: String },
			image: { type: String },
			numero: { type: Number, required: true },
			rarete: { type: mongoose.Schema.Types.ObjectId, ref: "Rarete", required: true },
			mission_premium: { type: Boolean, default: false },
		},
	],
})
module.exports = mongoose.model("Extension", extensionSchema)
