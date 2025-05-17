import { useRef, useState } from "react"
import PropTypes from "prop-types"
import { uploadCarteImage } from "../../function/Admin/uploadCarteImage"
import { uploadCarte } from "../../function/Admin/UploadCarte"
import { modifyCarte } from "../../function/Admin/modifyCarte"
/*Components*/
import DropDownRarete from "../../Components/Admin/DropDownRarete"
function ExtensionModal({
  extension,
  modifyExtension,
  setExtension,
  rarete,
  setOpenModifyExtention,
  openModifyExtention,
}) {
  const imageCarteRef = useRef(new FormData())
  const [previewImage, setPreviewImage] = useState({})
  return (
    <div className="h-[90%] w-[95%] rounded-lg bg-secondary py-[10px]">
      {extension.length > 0 &&
        extension
          .filter((fileredExtension) => fileredExtension._id === modifyExtension)
          .map((extensions, index) => (
            <div key={index} className="flex h-full flex-col items-center gap-[10px]">
              <p className="text-xl text-white">Cartes {extensions.nom}</p>
              <div className="flex max-h-full flex-grow flex-wrap justify-center gap-[10px] overflow-y-auto">
                {extensions.carte.map((cartes, indexCarte) => (
                  <div
                    key={indexCarte}
                    className="flex h-[370px] w-[330px] flex-col items-center gap-[10px] rounded-lg bg-tertiary py-[5px]"
                  >
                    <div className="flex items-center justify-center gap-[10px]">
                      <p className="text-xl text-white">N°{cartes.numero}</p>
                      <input
                        type="text"
                        defaultValue={cartes.nom}
                        className="h-10 w-[200px] rounded-sm bg-secondary pl-2 text-xl text-gray-100 outline-none"
                        onChange={(e) => modifyCarte("nom", e.target.value, indexCarte, modifyExtension, setExtension)}
                      />
                    </div>
                    <div className="flex w-full items-center justify-between px-[5px]">
                      <input
                        type="file"
                        className="hidden"
                        id={`file-upload-${indexCarte}`}
                        onChange={(e) =>
                          uploadCarteImage(
                            e.target.files[0],
                            indexCarte,
                            modifyExtension,
                            imageCarteRef,
                            setPreviewImage,
                            extension,
                            setExtension,
                          )
                        }
                      />
                      <label
                        htmlFor={`file-upload-${indexCarte}`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition duration-300 hover:bg-blue-600"
                      >
                        <p>Upload</p>
                      </label>
                      <div className="flex gap-[10px]">
                        <DropDownRarete
                          cartes={cartes}
                          rarete={rarete}
                          indexCarte={indexCarte}
                          modifyCarte={modifyCarte}
                          modifyExtension={modifyExtension}
                          setExtension={setExtension}
                        />
                      </div>
                    </div>
                    <img
                      src={previewImage[indexCarte] ?? `${import.meta.env.VITE_API_URL}/${cartes.image}`}
                      alt=""
                      className="h-[220px]"
                    />
                  </div>
                ))}
              </div>
              <div
                className="cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px] text-white"
                onClick={() =>
                  uploadCarte(modifyExtension, imageCarteRef, extension, setOpenModifyExtention, openModifyExtention)
                }
              >
                <p>Modifier</p>
              </div>
            </div>
          ))}
    </div>
  )
}
ExtensionModal.propTypes = {
  extension: PropTypes.array.isRequired,
  modifyExtension: PropTypes.string.isRequired,
  setExtension: PropTypes.func.isRequired,
  rarete: PropTypes.array.isRequired,
  setOpenModifyExtention: PropTypes.func.isRequired,
  openModifyExtention: PropTypes.bool.isRequired,
}
export default ExtensionModal
