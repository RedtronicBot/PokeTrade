export function uploadCarteImage(file, index, nomExtension, imageCarteRef, setPreviewImage, setExtension) {
  const extension = file.name.split(".").pop()
  const newFileName = `${nomExtension
    .normalize("NFD") // décompose les lettres accentuées en lettres + diacritiques
    .replace(/[\u0300-\u036f]/g, "") // enlève les diacritiques
    .replace(/[^a-zA-Z0-9._-]/g, "_") // garde que lettres, chiffres, points, tirets
    .toLowerCase()}_${(index + 1).toString().padStart(3, "0")}.${extension}`
  const newFile = new File([file], newFileName, { type: file.type })
  imageCarteRef.current.append("carte", newFile)
  const previewUrl = URL.createObjectURL(file)
  setPreviewImage((prev) => ({
    ...prev,
    [index]: previewUrl,
  }))
  setExtension((prevExtensions) => {
    const extensionCopy = [...prevExtensions]
    const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
    if (extensionToUpdate) {
      extensionToUpdate.carte[index].image = `${import.meta.env.VITE_API_URL}/cartes/${newFileName}`
    }
    return extensionCopy
  })
}
