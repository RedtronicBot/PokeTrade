import axios from "axios"
export function uploadModification(
  id,
  extension,
  rarete,
  extensionInModification,
  nbCarteTotalExtensionModifyRef,
  nomExtensionModifyRef,
  nbCarteExtensionModifyRef,
  imageExtensionModifyRef,
  nomExtensionRef,
  setExtension,
  setOpenModifyOneExtension,
  openModifyOneExtension,
) {
  const array_card = extension.find((ext) => ext.nom === extensionInModification).carte
  const last_index = array_card[array_card.length - 1].numero
  var carte = []
  carte = [...array_card]
  const difference = parseInt(nbCarteTotalExtensionModifyRef.current.value) - carte.length
  if (difference > 0) {
    for (var i = last_index; i < last_index + difference; i++) {
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
  } else if (difference < 0) {
    carte = carte.slice(0, difference)
  }
  axios
    .put(`${import.meta.env.VITE_API_URL}/extension/${id}`, {
      nom: nomExtensionModifyRef.current.value,
      nbCarteTotal: nbCarteTotalExtensionModifyRef.current.value,
      nbCarte: nbCarteExtensionModifyRef.current.value,
      carte: carte,
    })
    .then(() => {
      if (imageExtensionModifyRef.current.files[0] !== undefined) {
        const formDataImage = new FormData()
        formDataImage.append("image", imageExtensionModifyRef.current.files[0])
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
                setOpenModifyOneExtension(!openModifyOneExtension)
              })
              .catch((err) => console.error(err))
          })
          .catch((err) => console.error(err))
      } else {
        axios
          .get(`${import.meta.env.VITE_API_URL}/extension`)
          .then((res) => {
            setExtension(res.data)
            setOpenModifyOneExtension(!openModifyOneExtension)
          })
          .catch((err) => console.error(err))
      }
    })
    .catch((err) => console.error(err))
}
