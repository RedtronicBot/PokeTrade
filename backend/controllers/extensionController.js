const Extension = require("../models/extension")
const User = require("../models/user")
exports.getAllExtension = (req, res, next) => {
	Extension.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postExtension = async (req, res, next) => {
	try {
		const newExtension = await Extension.create(req.body)
		const extensionToAdd = {
			nom: newExtension.nom,
			carte: newExtension.carte.map((c) => ({
				numero: c.numero,
				obtenu: false,
				trade: false,
			})),
		}
		const users = await User.find()
		await Promise.all(
			users.map(async (user) => {
				user.carte.push(extensionToAdd)
				user.markModified("carte")
				await user.save()
			})
		)
		res.status(201).json({ message: "Extension créée et ajoutée à tous les utilisateurs" })
	} catch (error) {
		res.status(400).json({ error })
	}
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

exports.deleteExtension = async (req, res, next) => {
	try {
		const deletedExtension = await Extension.findOneAndDelete({ nom: req.body.nom })
		if (!deletedExtension) {
			return res.status(404).json({ message: "Extension non trouvée" })
		}
		const users = await User.find()
		await Promise.all(
			users.map(async (user) => {
				const filteredUserCarte = user.carte.filter((ext) => ext.nom !== req.body.nom)
				user.carte = filteredUserCarte
				user.markModified("carte")
				await user.save()
			})
		)
		res.status(200).json({ message: "Extension supprimée et retirée des utilisateurs" })
	} catch (error) {
		res.status(400).json({ error })
	}
}

exports.modifyOneExtension = async (req, res, next) => {
	try {
		const updatedExtension = await Extension.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					nom: req.body.nom,
					nbCarteTotal: req.body.nbCarteTotal,
					nbCarte: req.body.nbCarte,
					carte: req.body.carte,
				},
			},
			{ new: true }
		)
		if (!updatedExtension) {
			return res.status(404).json({ message: "Extension non trouvée" })
		}
		const users = await User.find()
		await Promise.all(
			users.map(async (user) => {
				const userCarte = JSON.parse(JSON.stringify(user.carte))
				const extUser = userCarte.find((e) => e.nom === updatedExtension.nom)
				const extensionStructure = {
					nom: updatedExtension.nom,
					carte: updatedExtension.carte.map((c) => ({
						numero: c.numero,
						obtenu: false,
						trade: false,
					})),
				}
				if (!extUser) {
					userCarte.push(extensionStructure)
				} else {
					const carteLengthDiff = updatedExtension.carte.length - extUser.carte.length
					if (carteLengthDiff > 0) {
						const missingItems = extensionStructure.carte.slice(-carteLengthDiff)
						extUser.carte.push(...missingItems)
					} else if (carteLengthDiff < 0) {
						extUser.carte.splice(updatedExtension.carte.length)
					}
				}

				if (JSON.stringify(user.carte) !== JSON.stringify(userCarte)) {
					user.carte = userCarte
					user.markModified("carte")
					await user.save()
				}
			})
		)

		res.status(201).json({ message: "Extension mise à jour et synchronisée avec les utilisateurs" })
	} catch (error) {
		res.status(400).json({ error })
	}
}
