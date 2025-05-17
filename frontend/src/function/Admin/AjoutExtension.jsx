import axios from "axios"
export function AjoutExtension(
  nbCarteTotalExtensionRef,
  rarete,
  nomExtensionRef,
  nbCarteExtensionRef,
  imageExtensionRef,
  tradableExtensionRef,
  setExtension,
) {
  const carte = []
  for (var i = 0; i < parseInt(nbCarteTotalExtensionRef.current.value); i++) {
    var carteObj

    carteObj = {
      nom: "",
      image: "",
      numero: i + 1,
      rarete: rarete[0]._id,
      mission_premium: false,
    }
    carte.push(carteObj)
  }
  const formData = new FormData()
  formData.append("image", imageExtensionRef.current.files[0])
  formData.append("nom", nomExtensionRef.current.value)
  formData.append("nbCarte", parseInt(nbCarteExtensionRef.current.value))
  formData.append("nbCarteTotal", parseInt(nbCarteTotalExtensionRef.current.value))
  formData.append("tradable", tradableExtensionRef.current.checked)
  formData.append("carte", JSON.stringify(carte))
  axios
    .post(`${import.meta.env.VITE_API_URL}/extension`, formData)
    .then(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/extension`)
        .then((res) => {
          setExtension(res.data)
          nomExtensionRef.current.value = ""
          nbCarteTotalExtensionRef.current.value = ""
          nbCarteExtensionRef.current.value = ""
          imageExtensionRef.current.value = ""
          tradableExtensionRef.current.checked = false
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}
