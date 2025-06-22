import axios from "axios"
export function uploadCarte(idExtension, imageCarteRef, extension, setOpenModifyExtention, openModifyExtention) {
  axios
    .put(`${import.meta.env.VITE_API_URL}/extension`, {
      nom: extension.find((ext) => ext._id === idExtension).nom,
      carte: extension.find((ext) => ext._id === idExtension).carte,
    })
    .then(() => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/extension/carte`, imageCarteRef.current, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setOpenModifyExtention(!openModifyExtention)
          imageCarteRef.current = new FormData()
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}
