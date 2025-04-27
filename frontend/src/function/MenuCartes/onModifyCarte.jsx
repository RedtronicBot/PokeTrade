export function onModifyCarte(field, value, nomExtension, indexCarte, setUser, setState) {
  setUser((prevUser) => {
    const updatedCarte = prevUser.carte.map((ext) => {
      if (ext.nom === nomExtension) {
        const newSubCarte = [...ext.carte]
        newSubCarte[indexCarte] = {
          ...newSubCarte[indexCarte],
          [field]: !value,
        }
        return {
          ...ext,
          carte: newSubCarte,
        }
      }
      return ext
    })
    return {
      ...prevUser,
      carte: updatedCarte,
    }
  })
  setState(!value)
}
