import axios from "axios"
export function uploadExtension({ user, setOpen, setUser }) {
	axios
		.put(`${import.meta.env.VITE_API_URL}/user/${user.nom}`, {
			carte: user.carte,
		})
		.then(() => {
			axios
				.get(`${import.meta.env.VITE_API_URL}/user/${user.nom}`)
				.then((res) => setUser(res.data))
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
	setOpen(!open)
}
