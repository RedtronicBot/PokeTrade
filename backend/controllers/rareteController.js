const Rarete = require("../models/rarete")
exports.getAllRarete = (req, res, next) => {
	Rarete.find()
		.then((extension) => res.status(200).json(extension))
		.catch((error) => res.status(400).json({ error }))
}

exports.postRarete = (req, res, next) => {
	req.body.url = `${process.env.VITE_API_URL}/raretes/${req.file.filename}`
	Rarete.create(req.body)
		.then(() => {
			res.status(201).json({ message: "Rarete crée" })
		})
		.catch((error) => res.status(400).json({ error }))
}
