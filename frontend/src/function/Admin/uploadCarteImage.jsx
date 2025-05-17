export function uploadCarteImage(file, index, idExtension, imageCarteRef, setPreviewImage, extension, setExtension) {
  const extensionFile = file.name.split(".").pop()
  const newFileName = `${idExtension}_${(index + 1).toString().padStart(3, "0")}.${extensionFile}`
  const newFile = new File([file], newFileName, { type: file.type })
  imageCarteRef.current.append("carte", newFile)
  const previewUrl = URL.createObjectURL(file)
  setPreviewImage((prev) => ({
    ...prev,
    [index]: previewUrl,
  }))
  setExtension((prevExtensions) => {
    const extensionCopy = [...prevExtensions]
    const extensionToUpdate = extensionCopy.find((ext) => ext._id === idExtension)
    if (extensionToUpdate) {
      extensionToUpdate.carte[index].image = `cartes/${newFileName}`
    }
    return extensionCopy
  })
}
