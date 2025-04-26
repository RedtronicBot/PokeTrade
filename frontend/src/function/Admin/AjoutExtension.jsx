import axios from "axios"
export function AjoutExtension(
	nbCarteTotalExtensionRef,
	rarete,
	nomExtensionRef,
	nbCarteExtensionRef,
	imageExtensionRef,
	setExtension
) {
	const carte = []
	for (var i = 0; i < parseInt(nbCarteTotalExtensionRef.current.value); i++) {
		var carteObj

		carteObj = {
			nom: "",
			image: "",
			obtenu: false,
			trade: false,
			numero: i + 1,
			rarete: rarete[0].nom,
			mission_premium: false,
		}
		carte.push(carteObj)
	}
	axios
		.post(`${import.meta.env.VITE_API_URL}/extension`, {
			nom: nomExtensionRef.current.value,
			nbCarteTotal: parseInt(nbCarteTotalExtensionRef.current.value),
			nbCarte: parseInt(nbCarteExtensionRef.current.value),
			carte: carte,
		})
		.then(() => {
			const file = imageExtensionRef.current.files[0]
			const extension = file.name.split(".").pop()
			const newFileName = `${nomExtensionRef.current.value
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^a-zA-Z0-9._-]/g, "_")
				.toLowerCase()}.${extension}`
			const newFile = new File([file], newFileName, {
				type: file.type,
			})
			const formDataImage = new FormData()
			formDataImage.append("image", newFile)
			formDataImage.append("nom", nomExtensionRef.current.value)
			axios
				.post(`${import.meta.env.VITE_API_URL}/extension/image`, formDataImage, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then(() => {
					axios
						.get(`${import.meta.env.VITE_API_URL}/extension`)
						.then((res) => {
							setExtension(res.data)
							nomExtensionRef.current.value = ""
							nbCarteTotalExtensionRef.current.value = ""
							nbCarteExtensionRef.current.value = ""
							imageExtensionRef.current.value = ""
						})
						.catch((err) => console.error(err))
				})
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
}
