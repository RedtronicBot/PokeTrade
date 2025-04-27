import axios from "axios"
export function deleteExtension(idExtension, setExtension) {
  axios
    .delete(`${import.meta.env.VITE_API_URL}/extension`, {
      data: { id: idExtension },
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
