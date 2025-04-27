import trash from "../../assets/trash-solid.svg"
import modify from "../../assets/pen-solid.svg"
import { deleteExtension } from "../../function/Admin/deleteExtension"
import PropTypes from "prop-types"
function ShowExtension({
  extension,
  setExtension,
  setModifyExtension,
  setOpenModifyExtention,
  openModifyExtention,
  setOpenModifyOneExtension,
  setExtensionInModification,
  openModifyOneExtension,
}) {
  function onModifyExtension(value) {
    setModifyExtension(value)
    setOpenModifyExtention(!openModifyExtention)
  }
  function onModifyOneExtension(nomExtension) {
    setOpenModifyOneExtension(!openModifyOneExtension)
    setExtensionInModification(nomExtension)
  }
  return (
    <div className="flex min-h-[200px] w-[90%] flex-wrap justify-center gap-[10px] rounded-xl bg-secondary px-[10px] py-[15px]">
      {extension.length > 0 &&
        extension.map((extensions, index) => (
          <div key={index} className="relative flex w-fit">
            <img
              src={trash}
              alt=""
              className="absolute left-[5px] top-[5px] h-[20px] cursor-pointer"
              style={{
                filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
              }}
              onClick={() => deleteExtension(extensions._id, setExtension)}
            />
            <img
              src={modify}
              alt=""
              className="absolute right-[5px] top-[5px] h-[20px] cursor-pointer"
              style={{
                filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
              }}
              onClick={() => onModifyOneExtension(extensions._id)}
            />
            <div
              className="flex w-[300px] flex-col items-center justify-center rounded-md bg-tertiary py-[10px] text-white"
              onClick={() => onModifyExtension(extensions._id)}
            >
              <p className="text-lg">{extensions.nom}</p>
              <div className="flex items-center justify-center gap-[10px] pt-[5px]">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${extensions.image}`}
                  className="max-h-[130px] max-w-[200px]"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
ShowExtension.propTypes = {
  extension: PropTypes.array.isRequired,
  setExtension: PropTypes.func.isRequired,
  setModifyExtension: PropTypes.func.isRequired,
  setOpenModifyExtention: PropTypes.func.isRequired,
  openModifyExtention: PropTypes.bool.isRequired,
  setOpenModifyOneExtension: PropTypes.func.isRequired,
  setExtensionInModification: PropTypes.func.isRequired,
  openModifyOneExtension: PropTypes.bool.isRequired,
}
export default ShowExtension
