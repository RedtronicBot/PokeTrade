export function getInterestingTradeCards(myUser, otherUser, strictMode) {
  console.log(strictMode)
  return {
    /*Pour l'utilisateur connecté -> récupération de chaque carte échangable*/
    me: myUser.extensions.map((ext) => {
      const myExt = otherUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const myCardNums = new Set((myExt?.carte || []).filter((c) => c.obtenu).map((c) => c.numero)) // on crée un set par référence du numéro de la carte obtenu par l'utilisateur connecté
      const filteredCarte = ext.carte.filter((card) => {
        const tradeCondition = strictMode
          ? card.trade === true && card.obtenu === true
          : card.trade === true && card.obtenu === true && !myCardNums.has(card.numero) // on filtre si l'autre à la carte et n'est pas une carte du set
        return tradeCondition
      })
      return {
        ...ext,
        carte: filteredCarte,
      }
    }),
    /*Autre utilisateur -> on regarde quel carte sont disponible à l'échange en retirant celle déjà obtenu par l'utilisateur connecté*/
    other: otherUser.extensions.map((ext) => {
      const myExt = myUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const otherExt = otherUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const otherCardNums = new Set((otherExt?.carte || []).filter((c) => c.obtenu).map((c) => c.numero)) // on crée un set par référence du numéro de la carte obtenu par l'utilisateur connecté
      const filteredCarteMyUser = myExt.carte.filter((card) => {
        const tradeCondition = card.trade === true && card.obtenu === true && !otherCardNums.has(card.numero) // on filtre si l'autre à la carte et n'est pas une carte du set
        return tradeCondition
      })
      const myCardNums = new Set(filteredCarteMyUser.map((c) => c.numero)) // on crée un set par référence du numéro de la carte obtenu par l'utilisateur connecté
      const myCardRarete = new Set(filteredCarteMyUser.map((c) => c.rarete.id))
      const filteredCarte = ext.carte.filter((card) => {
        const tradeCondition = strictMode
          ? card.trade === true && card.obtenu === true && !myCardNums.has(card.numero)
          : card.trade === true &&
            card.obtenu === true &&
            !myCardNums.has(card.numero) && // on filtre si l'autre à la carte et n'est pas une carte du set
            myCardRarete.has(card.rarete.id)
        return tradeCondition
      })
      return {
        ...ext,
        carte: filteredCarte,
      }
    }),
  }
}
