import trash from "../../assets/trash-solid.svg"
import modify from "../../assets/pen-solid.svg"
import PropTypes from "prop-types"
import { deleteRarete } from "../../function/Admin/deleteRarete"
function ShowRarete({ rarete, setRarete, setOpenModifyRarete, openModifyRarete, setRareteInModification }) {
  function onModifyOneRarete(idRarete) {
    setOpenModifyRarete(!openModifyRarete)
    setRareteInModification(idRarete)
  }
  return (
    <div className="flex min-h-[100px] w-[90%] flex-wrap items-center justify-center gap-[10px] rounded-xl bg-secondary px-[10px] py-[15px]">
      {rarete.map((raretes) => (
        <div
          key={raretes._id}
          className="relative flex min-h-[80px] flex-col justify-center gap-[10px] rounded-md bg-tertiary px-[10px] py-[25px]"
        >
          <img
            src={trash}
            alt=""
            className="absolute left-[5px] top-[5px] h-[20px] cursor-pointer"
            style={{
              filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
            }}
            onClick={() => deleteRarete(raretes._id, setRarete)}
          />
          <img
            src={modify}
            alt=""
            className="absolute right-[5px] top-[5px] h-[20px] cursor-pointer"
            style={{
              filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
            }}
            onClick={() => onModifyOneRarete(raretes._id)}
          />
          <p className="text-lg text-white">{raretes.nom}</p>
          <div className="flex items-center justify-center gap-[10px] pt-[5px]">
            <img src={`${import.meta.env.VITE_API_URL}/${raretes.url}`} className="max-h-[32px]" alt="" />
          </div>
          <p className="text-lg text-white">id:{raretes.id}</p>
        </div>
      ))}
    </div>
  )
}
ShowRarete.propTypes = {
  rarete: PropTypes.array.isRequired,
  setRarete: PropTypes.func.isRequired,
  setOpenModifyRarete: PropTypes.func.isRequired,
  openModifyRarete: PropTypes.bool.isRequired,
  setRareteInModification: PropTypes.func.isRequired,
}
export default ShowRarete
