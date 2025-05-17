import axios from "axios"
export function onReset(userNom, setUser, setOpen) {
  axios
    .get(`${import.meta.env.VITE_API_URL}/user/${userNom}`)
    .then((res) => {
      setUser(res.data)
      setOpen((prev) => !prev)
    })
    .catch((err) => console.error(err))
}
