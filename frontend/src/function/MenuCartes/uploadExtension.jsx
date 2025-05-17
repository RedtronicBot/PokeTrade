import axios from "axios"
export function uploadExtension(user, userNom, setOpen, setUser) {
  axios
    .put(`${import.meta.env.VITE_API_URL}/user/${userNom}`, {
      extension: user.extension,
    })
    .then(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${userNom}`)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  setOpen((prev) => !prev)
}
