import { useRef, useEffect } from "react"
import { modifyFieldExtension } from "../../function/Admin/modifyFieldExtension"
import { uploadModificationRarete } from "../../function/Admin/uploadModificationRarete"
import PropTypes from "prop-types"
function ModifyRareteModal({ rarete, rareteInModification, setRarete }) {
  const nomRareteModifyRef = useRef(null)
  const idRareteModifyRef = useRef(null)
  const imageRareteModifyRef = useRef(null)
  /*Remplissage de la modale de modification d'une extension*/
  const foundRarete = rarete.find((ext) => ext._id === rareteInModification)

  useEffect(() => {
    if (foundRarete) {
      nomRareteModifyRef.current.value = foundRarete.nom
      idRareteModifyRef.current.value = foundRarete.id
    }
  }, [foundRarete])
  return (
    <div className="h-[90%] w-[95%] rounded-lg bg-secondary py-[10px]">
      {foundRarete && (
        <div className="flex flex-col items-center gap-[20px]">
          <input
            type="text"
            placeholder="Nom"
            className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
            ref={nomRareteModifyRef}
            onChange={(e) => modifyFieldExtension("nom", e.value, foundRarete.nom, setRarete)}
          />
          <input
            type="text"
            placeholder="id"
            className="rounded-md bg-tertiary px-[15px] py-[10px]"
            ref={idRareteModifyRef}
            onChange={(e) => modifyFieldExtension("id", e.value, foundRarete.id, setRarete)}
          />
          <img src={foundRarete.url} className="max-h-[300px]" alt="" />
          <input type="file" ref={imageRareteModifyRef} />
          <div
            className="cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px] text-white"
            onClick={() => uploadModificationRarete(foundRarete._id)}
          >
            <p>Modifier</p>
          </div>
        </div>
      )}
    </div>
  )
}
ModifyRareteModal.propTypes = {
  rarete: PropTypes.array.isRequired,
  rareteInModification: PropTypes.string.isRequired,
  setRarete: PropTypes.func.isRequired,
}
export default ModifyRareteModal
