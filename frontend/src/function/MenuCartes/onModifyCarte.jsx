import axios from "axios"
export function onModifyCarte(field, value, idExtension, indexCarte, setUser, setState, user) {
  const updatedUser = { ...user } // copie de l'user
  updatedUser.extension = updatedUser.extension.map((ext) => {
    // on parcours les extension pour voir qui on modifie
    if (ext.idExtension === idExtension) {
      const newCartes = [...ext.carte] //  on récupère l'array de carte
      const updatedCard = { ...newCartes[indexCarte] } // on récupère la carte
      // si on peut la trade alors on l'as obtenu
      if (field === "trade" && value === false) {
        updatedCard.trade = true
        updatedCard.obtenu = true
        // si on n'as pas la carte on retire le trade par sécurité si il a été choisi
      } else if (field === "obtenu" && value === true) {
        updatedCard.trade = false
        updatedCard.obtenu = false
      } else {
        //sinon on modifie clée de l'inverse de la valeur
        updatedCard[field] = !value
      }

      newCartes[indexCarte] = updatedCard
      // on redonne l'array de carte modifié à l'extension
      return {
        ...ext,
        carte: newCartes,
      }
    }
    return ext
  })

  setUser(updatedUser)

  axios
    .put(`${import.meta.env.VITE_API_URL}/user/${user.nom}`, {
      extension: updatedUser.extension,
    })
    .catch((err) => console.error(err))

  setState((prev) => !prev)
}
