const Extension = require("../models/extension")
exports.getAllExtension = (req, res, next) => {
	Extension.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postExtension = (req, res, next) => {
	Extension.create(req.body)
		.then(() => {
			res.status(201).json({ message: "Extension crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.postCarte = (req, res, next) => {
	Extension.findOneAndUpdate({ nom: req.body.nom }, { $set: { carte: req.body.carte } })
		.then(() => {
			res.status(201).json({ message: "Extension crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.postImageExtension = (req, res, next) => {
	Extension.findOneAndUpdate(
		{ nom: req.body.nom },
		{ image: `${process.env.VITE_API_URL}/extensions/${req.file.filename}` }
	)
		.then(() => res.status(200).json({ message: "Image Ajouté" }))
		.catch((error) => {
			res.status(400).json({ error })
		})
}

exports.postImageCarte = (req, res, next) => {
	res.json({ message: "Images uploadés", files: req.files })
}

exports.deleteExtension = (req, res, next) => {
	Extension.findOneAndDelete({ nom: req.body.nom })
		.then(() => {
			res.status(200).json({ message: "Extension supprimé" })
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.modifyOneExtension = (req, res, next) => {
	Extension.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				nom: req.body.nom,
				nbCarteTotal: req.body.nbCarteTotal,
				nbCarte: req.body.nbCarte,
				carte: req.body.carte,
			},
		}
	)
		.then(() => {
			res.status(201).json({ message: "Extension crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}
