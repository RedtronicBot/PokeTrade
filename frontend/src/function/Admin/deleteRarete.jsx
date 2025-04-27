import axios from "axios"
export function deleteRarete(rarete, setRarete) {
  axios
    .delete(`${import.meta.env.VITE_API_URL}/rarete`, {
      data: { id: rarete },
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
