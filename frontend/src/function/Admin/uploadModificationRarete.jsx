import axios from "axios"
export function uploadModificationRarete(nomRareteRef, idRareteModifyRef, id, setRarete) {
  axios
    .put(`${import.meta.env.VITE_API_URL}/rarete/${id}`, {
      nom: nomRareteRef.current.value,
      id: idRareteModifyRef.current.value,
    })
    .then(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/rarete`)
        .then((res) => {
          setRarete(res.data)
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}
