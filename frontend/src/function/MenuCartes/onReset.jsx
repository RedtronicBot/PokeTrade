import axios from "axios"
export function onReset({ user, setUser, setOpen }) {
	axios
		.get(`${import.meta.env.VITE_API_URL}/user/${user.nom}`)
		.then((res) => {
			setUser(res.data)
			setOpen(!open)
		})
		.catch((err) => console.error(err))
}
