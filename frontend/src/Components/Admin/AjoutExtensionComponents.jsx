import { useRef } from "react"
import PropTypes from "prop-types"
import { AjoutRarete } from "../../function/Admin/AjoutRarete"
import { AjoutExtension } from "../../function/Admin/AjoutExtension"
function AjoutExtensionComponents({ nomExtensionRef, rarete, setExtension, setRarete }) {
  const nbCarteTotalExtensionRef = useRef(null)
  const nbCarteExtensionRef = useRef(null)
  const imageExtensionRef = useRef(null)
  const imageRareteRef = useRef(null)
  const rareteRef = useRef(null)
  const idRareteRef = useRef(null)
  return (
    <div className="mt-[25px] flex justify-center gap-[50px] text-white">
      <div className="flex flex-col items-center gap-[10px] rounded-md bg-secondary px-[15px] py-[10px]">
        <h2>Ajouter une extension</h2>
        <input
          type="text"
          placeholder="Nom"
          className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
          ref={nomExtensionRef}
        />
        <input
          type="text"
          placeholder="NbCarteTotal"
          className="rounded-md bg-tertiary px-[15px] py-[10px]"
          ref={nbCarteTotalExtensionRef}
        />
        <input
          type="text"
          placeholder="NbCarte"
          className="rounded-md bg-tertiary px-[15px] py-[10px]"
          ref={nbCarteExtensionRef}
        />
        <p>Image</p>
        <input type="file" ref={imageExtensionRef} />
        <div
          onClick={() =>
            AjoutExtension(
              nbCarteTotalExtensionRef,
              rarete,
              nomExtensionRef,
              nbCarteExtensionRef,
              imageExtensionRef,
              setExtension,
            )
          }
          className="cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px]"
        >
          Ajouter
        </div>
      </div>
      <div className="flex flex-col items-center gap-[10px] rounded-md bg-secondary px-[15px] py-[10px]">
        <h2>Ajouter une rareté</h2>
        <input
          type="text"
          placeholder="Nom"
          className="h-10 rounded-sm bg-gray-500 pl-2 text-xl text-gray-100 outline-none"
          ref={rareteRef}
        />
        <p>id (nombre pour mettre un ordre aux raretés)</p>
        <input type="text" placeholder="id" className="rounded-md bg-tertiary px-[15px] py-[10px]" ref={idRareteRef} />
        <input type="file" ref={imageRareteRef} />
        <div
          onClick={() => AjoutRarete(imageRareteRef, rareteRef, idRareteRef, setRarete)}
          className="cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px]"
        >
          <p>Ajouter</p>
        </div>
      </div>
    </div>
  )
}
AjoutExtensionComponents.propTypes = {
  nomExtensionRef: PropTypes.object.isRequired,
  AjoutExtension: PropTypes.func.isRequired,
  rarete: PropTypes.array.isRequired,
  setExtension: PropTypes.func.isRequired,
  setRarete: PropTypes.func.isRequired,
}
export default AjoutExtensionComponents
