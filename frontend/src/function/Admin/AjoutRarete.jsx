import axios from "axios"
export function AjoutRarete(imageRareteRef, rareteRef, setRarete) {
	const rareteFormData = new FormData()
	rareteFormData.append("rarete", imageRareteRef.current.files[0])
	rareteFormData.append("nom", rareteRef.current.value)
	axios
		.post(`${import.meta.env.VITE_API_URL}/rarete`, rareteFormData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then(() => {
			axios
				.get(`${import.meta.env.VITE_API_URL}/rarete`)
				.then((res) => setRarete(res.data))
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
	rareteRef.current.value = ""
	imageRareteRef.current.value = ""
}
