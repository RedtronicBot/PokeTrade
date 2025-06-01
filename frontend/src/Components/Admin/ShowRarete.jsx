import { Pencil, Trash2 } from "lucide-react"
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
          <Trash2
            size={20}
            className="absolute left-[5px] top-[5px] cursor-pointer text-white"
            onClick={() => deleteRarete(raretes._id, setRarete)}
          />
          <Pencil
            size={20}
            className="absolute right-[5px] top-[5px] cursor-pointer text-white"
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
