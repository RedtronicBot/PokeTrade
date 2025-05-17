const User = require("../models/user")
const Extension = require("../models/extension")
const axios = require("axios")
exports.login = (req, res, next) => {
	const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${
		process.env.CLIENT_ID
	}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`
	res.redirect(redirectUri)
}

exports.redirect = async (req, res, next) => {
	const params = new URLSearchParams()
	params.append("client_id", process.env.CLIENT_ID)
	params.append("client_secret", process.env.CLIENT_SECRET)
	params.append("grant_type", "authorization_code")
	params.append("code", req.query.code)
	params.append("redirect_uri", process.env.REDIRECT_URI)
	try {
		const tokenResponse = await axios.post("https://discord.com/api/oauth2/token", params, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		const { access_token, token_type } = tokenResponse.data
		const userDataResponse = await axios.get("https://discord.com/api/users/@me", {
			headers: { authorization: `${token_type} ${access_token}` },
		})
		const { username, avatar, id } = userDataResponse.data
		const avatar_url = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
		let user = await User.findOne({ id: userDataResponse.data.id })
		if (!user) {
			const extensions = await Extension.find()
			const cartes = extensions.map((ext, indexExt) => ({
				idExtension: ext._id,
				carte: ext.carte.map((c) => ({ numero: c.numero, obtenu: false, trade: false })),
			}))

			user = new User({
				nom: username,
				avatar_url,
				id,
				extension: cartes,
				admin: false,
			})
			await user.save()
		} else {
			if (user.nom !== username || user.avatar_url !== avatar_url) {
				user.nom = username
				user.avatar_url = avatar_url
				await user.save()
			}
		}
		res.redirect(`${process.env.WEBSITE_URL}?nom=${encodeURIComponent(username)}`)
	} catch (error) {
		console.error("Erreur d'auth Discord :", error)
		res.status(500).json({ error: "Erreur lors de l'authentification Discord" })
	}
}
