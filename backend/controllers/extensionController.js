const Extension = require("../models/extension")
const User = require("../models/user")
const fs = require("fs")
const path = require("path")
exports.getAllExtension = (req, res, next) => {
	Extension.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postExtension = async (req, res, next) => {
	try {
		req.body.image = `extensions/${req.file.filename}`
		req.body.carte = JSON.parse(req.body.carte)
		const newExtension = await Extension.create(req.body)
		if (newExtension.image) {
			const oldPath = path.join(__dirname, "..", newExtension.image)
			const newImageName = `extensions/${newExtension._id}.png`
			const newPath = path.join(__dirname, "..", newImageName)

			try {
				await fs.promises.rename(oldPath, newPath)
				newExtension.image = newImageName
				await newExtension.save()
			} catch (err) {
				console.error("Erreur lors du renommage de l'image :", err)
			}
		}
		const extensionToAdd = {
			idExtension: newExtension._id,
			carte: newExtension.carte.map((c) => ({
				numero: c.numero,
				obtenu: false,
				trade: false,
				liked: false,
			})),
		}
		await User.updateMany({}, { $push: { extension: extensionToAdd } })
		res.status(201).json({ message: "Extension créée et ajoutée à tous les utilisateurs", extension: newExtension })
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

exports.postImageCarte = (req, res, next) => {
	res.json({ message: "Images uploadés", files: req.files })
}

exports.deleteExtension = async (req, res, next) => {
	try {
		const findExtension = await Extension.findOne({ _id: req.body.id })
		if (!findExtension) {
			return res.status(404).json({ message: "Extension non trouvée" })
		}
		if (findExtension.image) {
			const imagePath = path.join(__dirname, "..", findExtension.image)
			const imageName = findExtension.image.split("/").pop()
			const id = imageName.split(".")[0]
			try {
				await fs.promises.unlink(imagePath)
				const folderPath = path.join(__dirname, "..", "cartes")
				const files = await fs.promises.readdir(folderPath)
				const matchingFiles = files.filter((file) => file.startsWith(id))
				await Promise.all(matchingFiles.map((file) => fs.promises.unlink(path.join(folderPath, file))))
			} catch (err) {
				console.warn("Fichier image introuvable ou déjà supprimé :", err.message)
			}
		}
		const deletedExtension = await Extension.findOneAndDelete({ _id: req.body.id })
		await Promise.all(
			(
				await User.find()
			).map(async (user) => {
				user.extension = user.extension.filter((ext) => ext._id !== deletedExtension._id)
				user.markModified("extension")
				await user.save()
			})
		)
		res.status(200).json({ message: "Extension supprimée et retirée des utilisateurs" })
	} catch (error) {
		console.error("Erreur lors de la suppression :", error)
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
					tradable: req.body.tradable,
					carte: req.body.carte,
				},
			},
			{ new: true }
		)

		if (!updatedExtension) {
			return res.status(404).json({ message: "Extension non trouvée" })
		}

		if (req.body.carte) {
			const users = await User.find()
			await Promise.all(
				users.map(async (user) => {
					const userCarte = JSON.parse(JSON.stringify(user.extension))
					const extUser = userCarte.find((e) => e.idExtension === updatedExtension._id.toString())
					const extensionStructure = {
						idExtension: updatedExtension._id,
						carte: updatedExtension.carte.map((c) => ({
							numero: c.numero,
							obtenu: false,
							trade: false,
						})),
					}
					const carteLengthDiff = updatedExtension.carte.length - extUser.carte.length
					if (carteLengthDiff > 0) {
						const missingItems = extensionStructure.carte.slice(-carteLengthDiff)
						extUser.carte.push(...missingItems)
					} else if (carteLengthDiff < 0) {
						extUser.carte.splice(updatedExtension.carte.length)
					}

					if (JSON.stringify(user.extension) !== JSON.stringify(userCarte)) {
						user.extension = userCarte
						user.markModified("extension")
						await user.save()
					}
				})
			)
		}

		res.status(201).json({ message: "Extension mise à jour et synchronisée avec les utilisateurs" })
	} catch (error) {
		res.status(400).json({ error })
	}
}
