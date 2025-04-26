import axios from "axios"
export function deleteExtension(nomExtension, setExtension) {
	axios
		.delete(`${import.meta.env.VITE_API_URL}/extension`, {
			data: { nom: nomExtension },
		})
		.then(() => {
			axios
				.get(`${import.meta.env.VITE_API_URL}/extension`)
				.then((res) => {
					setExtension(res.data)
				})
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
}
