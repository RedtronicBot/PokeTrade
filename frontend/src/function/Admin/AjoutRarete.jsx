import axios from "axios"
export function AjoutRarete(imageRareteRef, rareteRef, idRareteRef, setRarete) {
  const file = imageRareteRef.current.files[0]
  const extension = file.name.split(".").pop()
  const newFileName = `${rareteRef.current.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .toLowerCase()}.${extension}`
  const newFile = new File([file], newFileName, {
    type: file.type,
  })
  const rareteFormData = new FormData()
  rareteFormData.append("rarete", newFile)
  rareteFormData.append("nom", rareteRef.current.value)
  rareteFormData.append("id", idRareteRef.current.value)
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
  idRareteRef.current.value = ""
}
