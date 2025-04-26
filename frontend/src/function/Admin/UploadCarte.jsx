import axios from "axios"
export function uploadCarte(nomExtension, imageCarteRef, extension, setOpenModifyExtention, openModifyExtention) {
	axios
		.put(`${import.meta.env.VITE_API_URL}/extension`, {
			nom: nomExtension,
			carte: extension.find((ext) => ext.nom === nomExtension).carte,
		})
		.then(() => {
			axios
				.post(`${import.meta.env.VITE_API_URL}/extension/carte`, imageCarteRef.current, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then(() => setOpenModifyExtention(!openModifyExtention))
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
}
