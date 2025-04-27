const User = require("../models/user")
exports.getUser = (req, res, next) => {
	User.aggregate([
		{ $unwind: "$carte" }, // 1. Déplier chaque extension de l'utilisateur
		{
			$lookup: {
				// 2. Chercher l'extension correspondante
				from: "extensions",
				localField: "carte.nom",
				foreignField: "nom",
				as: "extension",
			},
		},
		{ $unwind: "$extension" }, // 3. Unwind car $lookup donne un tableau

		{ $unwind: "$carte.carte" }, // 4. Déplier chaque carte du user

		{ $unwind: "$extension.carte" }, // 5. Déplier chaque carte dans l'extension

		{
			$lookup: {
				from: "raretes",
				localField: "extension.carte.rarete",
				foreignField: "_id",
				as: "rareteInfo",
			},
		},

		{ $unwind: "$rareteInfo" },

		{
			$match: {
				$expr: { $eq: ["$carte.carte.numero", "$extension.carte.numero"] },
			},
		},

		{
			$project: {
				_id: 1,
				nom: 1,
				avatar_url: 1,
				extensionNom: "$carte.nom",
				carteIndex: "$carte.index",
				carte: {
					numero: "$carte.carte.numero",
					obtenu: "$carte.carte.obtenu",
					trade: "$carte.carte.trade",
					rarete: {
						id: "$rareteInfo.id",
						url: "$rareteInfo.url",
						nom: "$extension.carte.rarete",
					},
					nom: "$extension.carte.nom",
				},
			},
		},

		{
			$group: {
				// 8. Regrouper toutes les cartes enrichies par utilisateur
				_id: {
					userId: "$_id",
					extensionNom: "$extensionNom",
				},
				carteIndex: { $first: "$carteIndex" },
				nom: { $first: "$nom" },
				avatar_url: { $first: "$avatar_url" },
				cartes: { $push: "$carte" },
			},
		},
		{
			$group: {
				// 9. Regrouper par user uniquement
				_id: "$_id.userId",
				nom: { $first: "$nom" },
				avatar_url: { $first: "$avatar_url" },
				extensions: {
					$push: {
						nomExtension: "$_id.extensionNom",
						index: "$carteIndex",
						cartes: "$cartes",
					},
				},
			},
		},
		{
			$addFields: {
				extensions: {
					$sortArray: { input: "$extensions", sortBy: { index: 1 } },
				},
			},
		},
		{
			$sort: {
				_id: 1,
			},
		},
	])
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(400).json({ err }))
}

exports.getOneUser = (req, res, next) => {
	User.findOne({ nom: req.params.nom })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }))
}

exports.modifyCarteUser = (req, res, next) => {
	User.findOneAndUpdate({ nom: req.params.nom }, { $set: { carte: req.body.carte } })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }))
}
