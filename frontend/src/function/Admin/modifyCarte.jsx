export function modifyCarte(field, value, index, nomExtension, setExtension) {
	setExtension((prevExtensions) => {
		const extensionCopy = [...prevExtensions]
		const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
		if (extensionToUpdate) {
			extensionToUpdate.carte[index][field] = value
		}
		return extensionCopy
	})
}
