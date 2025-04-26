export function modifyFieldExtension(field, value, nomExtension, setExtension) {
	setExtension((prevExtensions) => {
		const extensionCopy = [...prevExtensions]
		const extensionToUpdate = extensionCopy.find((ext) => ext.nom === nomExtension)
		if (extensionToUpdate) {
			extensionToUpdate[field] = value
		}
		return extensionCopy
	})
}
