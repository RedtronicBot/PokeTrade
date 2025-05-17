export function onModifyCarte(field, value, idExtension, indexCarte, setUser, setState) {
  setUser((prevUser) => {
    const updatedCarte = prevUser.extension.map((ext) => {
      if (ext.idExtension === idExtension) {
        const newCartes = [...ext.carte]
        newCartes[indexCarte] = {
          ...newCartes[indexCarte],
          [field]: !value,
        }
        return {
          ...ext,
          carte: newCartes,
        }
      }
      return ext
    })

    return {
      ...prevUser,
      extension: updatedCarte,
    }
  })

  setState((prev) => !prev)
}
