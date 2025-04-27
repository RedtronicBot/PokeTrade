import { useRef, useEffect } from "react"
import { modifyFieldExtension } from "../../function/Admin/modifyFieldExtension"
import { uploadModification } from "../../function/Admin/uploadModification"
import PropTypes from "prop-types"
function ModifyExtensionModal({
  extension,
  extensionInModification,
  setExtension,
  rarete,
  nomExtensionRef,
  setOpenModifyOneExtension,
  openModifyOneExtension,
}) {
  const nomExtensionModifyRef = useRef(null)
  const nbCarteTotalExtensionModifyRef = useRef(null)
  const nbCarteExtensionModifyRef = useRef(null)
  const imageExtensionModifyRef = useRef(null)
  /*Remplissage de la modale de modification d'une extension*/
  const foundExtension = extension.find((ext) => ext._id === extensionInModification)

  useEffect(() => {
    if (foundExtension) {
      nomExtensionModifyRef.current.value = foundExtension.nom
      nbCarteExtensionModifyRef.current.value = foundExtension.nbCarte
      nbCarteTotalExtensionModifyRef.current.value = foundExtension.nbCarteTotal
    }
  }, [foundExtension])
  return (
    <div className="h-[90%] w-[95%] rounded-lg bg-secondary py-[10px]">
      {foundExtension && (
        <div className="flex flex-col items-center gap-[20px]">
          <input
            type="text"
            placeholder="Nom"
            className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
            ref={nomExtensionModifyRef}
            onChange={(e) => modifyFieldExtension("nom", e.value, foundExtension.name, setExtension)}
          />
          <input
            type="text"
            placeholder="NbCarteTotal"
            className="rounded-md bg-tertiary px-[15px] py-[10px]"
            ref={nbCarteTotalExtensionModifyRef}
            onChange={(e) => modifyFieldExtension("nbCarteTotal", e.value, foundExtension.name, setExtension)}
          />
          <input
            type="text"
            placeholder="NbCarte"
            className="rounded-md bg-tertiary px-[15px] py-[10px]"
            ref={nbCarteExtensionModifyRef}
            onChange={(e) => modifyFieldExtension("nbCarte", e.value, foundExtension.name, setExtension)}
          />
          <img src={`${import.meta.env.VITE_API_URL}/${foundExtension.image}`} className="max-h-[300px]" alt="" />
          <input type="file" ref={imageExtensionModifyRef} />
          <div
            className="cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px] text-white"
            onClick={() =>
              uploadModification(
                foundExtension._id,
                extension,
                rarete,
                extensionInModification,
                nbCarteTotalExtensionModifyRef,
                nomExtensionModifyRef,
                nbCarteExtensionModifyRef,
                imageExtensionModifyRef,
                nomExtensionRef,
                setExtension,
                setOpenModifyOneExtension,
                openModifyOneExtension,
              )
            }
          >
            <p>Modifier</p>
          </div>
        </div>
      )}
    </div>
  )
}
ModifyExtensionModal.propTypes = {
  extension: PropTypes.array.isRequired,
  extensionInModification: PropTypes.string.isRequired,
  setExtension: PropTypes.func.isRequired,
  rarete: PropTypes.array.isRequired,
  nomExtensionRef: PropTypes.object.isRequired,
  setOpenModifyOneExtension: PropTypes.func.isRequired,
  openModifyOneExtension: PropTypes.bool.isRequired,
}
export default ModifyExtensionModal
