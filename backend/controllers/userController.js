const User = require("../models/user")
exports.getUser = (req, res, next) => {
	User.aggregate([
		// 1. Trier par nom de l'utilisateur de manière alphabétique
		{ $sort: { nom: 1 } }, // 1 signifie croissant

		// Unwind des cartes
		{ $unwind: "$extension" },
		{ $unwind: "$extension.carte" },

		// Join avec extensions pour enrichir à partir de idExtension
		{
			$lookup: {
				from: "extensions",
				localField: "extension.idExtension",
				foreignField: "_id",
				as: "extensionData",
			},
		},
		{ $unwind: "$extensionData" },

		{
			$match: {
				"extensionData.tradable": true,
			},
		},

		// Trouver la bonne carte par numéro dans extensionData.carte
		{
			$addFields: {
				matchedCarte: {
					$arrayElemAt: [
						{
							$filter: {
								input: "$extensionData.carte",
								as: "c",
								cond: {
									$eq: ["$$c.numero", "$extension.carte.numero"],
								},
							},
						},
						0,
					],
				},
			},
		},

		// Joindre avec raretes pour récupérer les informations de rareté
		{
			$lookup: {
				from: "raretes",
				localField: "matchedCarte.rarete",
				foreignField: "_id",
				as: "rareteData",
			},
		},
		{ $unwind: { path: "$rareteData", preserveNullAndEmptyArrays: true } },

		// Enrichir la carte avec les données de rareté
		{
			$addFields: {
				enrichedCarte: {
					numero: "$extension.carte.numero",
					obtenu: "$extension.carte.obtenu",
					trade: "$extension.carte.trade",
					nom: "$matchedCarte.nom",
					rarete: {
						url: "$rareteData.url",
						id: "$rareteData.id",
					},
				},
			},
		},

		// Groupement des cartes par utilisateur et extension
		{
			$group: {
				_id: {
					userId: "$_id",
					nom: "$nom",
					idExtension: "$extension.idExtension",
					nomExtension: "$extensionData.nom", // Ajouter le nom de l'extension ici
				},
				cartes: { $push: "$enrichedCarte" },
			},
		},

		// Re-grouper par utilisateur, en ajoutant un tableau d'extensions avec leurs cartes
		{
			$group: {
				_id: { userId: "$_id.userId", nom: "$_id.nom" },
				extensions: {
					$push: {
						idExtension: "$_id.idExtension",
						nomExtension: "$_id.nomExtension", // Inclure le nom de l'extension
						carte: "$cartes",
					},
				},
			},
		},

		// 2. Trier les extensions par idExtension (ordre croissant)
		{
			$addFields: {
				extensions: {
					$sortArray: {
						input: "$extensions",
						sortBy: { idExtension: 1 }, // Tri par idExtension (ordre croissant)
					},
				},
			},
		},

		// 3. Projection finale
		{
			$project: {
				_id: "$_id.userId",
				nom: "$_id.nom",
				extensions: 1,
			},
		},
	])
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).json({ error: err.message }))
}

exports.getOneUser = (req, res, next) => {
	User.findOne({ nom: req.params.name })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }))
}

exports.modifyCarteUser = (req, res, next) => {
	User.findOneAndUpdate({ nom: req.params.name }, { $set: { extension: req.body.extension } })
		.then((user) => {
			res.status(200).json(user)
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}
