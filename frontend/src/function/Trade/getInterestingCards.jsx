export function getInterestingTradeCards(myUser, otherUser) {
  return {
    /*Pour l'utilisateur connecté -> récupération de chaque carte échangable*/
    me: myUser.extensions.map((ext) => {
      const myExt = otherUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const myCardNums = new Set(myExt.carte.filter((c) => c.obtenu).map((c) => c.numero)) // on crée un set par référence du numéro de la carte obtenu par l'utilisateur connecté
      const filteredCarte = ext.carte.filter((card) => {
        const tradeCondition = card.trade === true && card.obtenu === true && !myCardNums.has(card.numero) // on filtre si l'autre à la carte et n'est pas une carte du set
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
      const myCardNums = new Set(myExt.carte.filter((c) => c.trade).map((c) => c.numero)) // on crée un set par référence du numéro de la carte tradable de soi même
      /*Faire un set généraliste sur toutes les extensions de toutes les raretes*/
      const findEveryRarete = otherUser.extensions.map((ext) => {
        const myExt = myUser.extensions.find((e) => e.idExtension === ext.idExtension)
        const otherCardNumsExt = new Set(myExt.carte.filter((c) => c.trade).map((c) => c.rarete.id))
        return otherCardNumsExt
      })
      /*réduction de l'array de set en un unique set*/
      const allRaretes = new Set(findEveryRarete.flatMap((set) => Array.from(set)))
      const filteredCarte = ext.carte.filter((card) => {
        const tradeCondition =
          card.trade === true &&
          card.obtenu === true &&
          !myCardNums.has(card.numero) && // on filtre si l'autre à la carte et n'est pas une carte du set
          allRaretes.has(card.rarete.id) //on vérifie si la rareté est la bonne
        return tradeCondition
      })
      return {
        ...ext,
        carte: filteredCarte,
      }
    }),
  }
}
