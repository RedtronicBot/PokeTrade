const Rarete = require("../models/rarete")
const fs = require("fs")
const path = require("path")
exports.getAllRarete = (req, res, next) => {
	Rarete.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postRarete = (req, res, next) => {
	req.body.url = `raretes/${req.file.filename}`
	Rarete.create(req.body)
		.then(() => {
			res.status(201).json({ message: "Rarete crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.deleteRarete = (req, res, next) => {
	Rarete.findOne({ _id: req.body.id })
		.then((rarete) => {
			if (!rarete) {
				return res.status(404).json({ message: "Rarete non trouvée" })
			}

			const imagePath = path.join(__dirname, "..", rarete.url) // Attention ici, adapte selon où est stocké ton image

			// Supprimer l'image
			fs.unlink(imagePath, (err) => {
				if (err) {
					console.error("Erreur lors de la suppression de l'image :", err)
					// Tu peux choisir ici de continuer ou d'envoyer une erreur
				}

				// Après suppression de l'image, supprimer la rareté
				Rarete.findOneAndDelete({ _id: req.body.id })
					.then(() => res.status(200).json({ message: "Rarete supprimée" }))
					.catch((error) => res.status(400).json({ error }))
			})
		})
		.catch((error) => res.status(400).json({ error }))
}
