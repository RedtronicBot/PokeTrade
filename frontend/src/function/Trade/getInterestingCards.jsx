export function getInterestingTradeCards(myUser, otherUser) {
  const myRareteIds = new Set()

  // Étape 1 : Construire l'ensemble des raretés disponibles dans les cartes tradables et obtenues de l'utilisateur connecté
  myUser.extensions.forEach((myExt) => {
    const otherExt = otherUser.extensions.find((e) => e.idExtension === myExt.idExtension)
    const otherCardNums = new Set(otherExt?.carte.filter((c) => c.obtenu).map((c) => c.numero) || [])

    myExt.carte.forEach((card) => {
      if (card.trade && card.obtenu && !otherCardNums.has(card.numero)) {
        myRareteIds.add(card.rarete.id)
      }
    })
  })

  return {
    me: myUser.extensions.map((ext) => {
      const otherExt = otherUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const otherCardNums = new Set(otherExt?.carte.filter((c) => c.obtenu).map((c) => c.numero) || [])

      const filteredCarte = ext.carte.filter((card) => card.trade && card.obtenu && !otherCardNums.has(card.numero))

      return { ...ext, carte: filteredCarte }
    }),

    other: otherUser.extensions.map((ext) => {
      const myExt = myUser.extensions.find((e) => e.idExtension === ext.idExtension)
      const myCardNums = new Set(myExt?.carte.filter((c) => c.obtenu).map((c) => c.numero) || [])
      const filteredCarte = ext.carte.filter(
        (card) => card.trade && card.obtenu && !myCardNums.has(card.numero) && myRareteIds.has(card.rarete.id),
      )

      return { ...ext, carte: filteredCarte }
    }),
  }
}
