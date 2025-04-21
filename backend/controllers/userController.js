const User = require("../models/user")
exports.getUser = (req, res, next) => {
	User.findOne({ nom: req.params.nom })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }))
}

exports.modifyCarteUser = (req, res, next) => {
	User.findOneAndUpdate({ nom: req.params.nom }, { $set: { carte: req.body.carte } })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({ error }))
}
