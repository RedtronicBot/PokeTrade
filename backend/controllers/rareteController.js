const Rarete = require("../models/rarete")
const fs = require("fs")
const path = require("path")
exports.getAllRarete = (req, res, next) => {
	Rarete.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postRarete = async (req, res, next) => {
	try {
		req.body.url = `raretes/${req.file.filename}`
		const newRarete = await Rarete.create(req.body)
		if (newRarete.url) {
			const oldPath = path.join(__dirname, "..", newRarete.url)
			const newImageName = `raretes/${newRarete._id}.png`
			const newPath = path.join(__dirname, "..", newImageName)

			try {
				await fs.promises.rename(oldPath, newPath)
				newRarete.url = newImageName
				await newRarete.save()
			} catch (err) {
				console.error("Erreur lors du renommage de l'image :", err)
			}
		}
		res.status(201).json({ message: "Rarete crée", rarete: newRarete })
	} catch (error) {
		res.status(400).json({ error })
	}
}

exports.deleteRarete = (req, res, next) => {
	Rarete.findOne({ _id: req.body.id })
		.then((rarete) => {
			if (!rarete) {
				return res.status(404).json({ message: "Rarete non trouvée" })
			}
			const imagePath = path.join(__dirname, "..", rarete.url)
			fs.unlink(imagePath, (err) => {
				if (err) {
					console.error("Erreur lors de la suppression de l'image :", err)
				}
				Rarete.findOneAndDelete({ _id: req.body.id })
					.then(() => res.status(200).json({ message: "Rarete supprimée" }))
					.catch((error) => res.status(400).json({ error }))
			})
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.modifyRarete = (req, res, next) => {
	Rarete.findOneAndUpdate({ _id: req.body.id }, { nom: req.body.nom, id: req.body.idValue })
		.then(() => res.status(200).json({ message: "Rarete supprimée" }))
		.catch((error) => res.status(400).json({ error }))
}
