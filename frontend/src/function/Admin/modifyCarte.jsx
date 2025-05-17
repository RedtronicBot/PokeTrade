export function modifyCarte(field, value, index, idExtension, setExtension) {
  setExtension((prevExtensions) => {
    const extensionCopy = [...prevExtensions]
    const extensionToUpdate = extensionCopy.find((ext) => ext._id === idExtension)
    if (extensionToUpdate) {
      extensionToUpdate.carte[index][field] = value
    }
    return extensionCopy
  })
}
