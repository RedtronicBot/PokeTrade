import { useEffect, useState } from "react"
import PropTypes from "prop-types"
/*fonctions*/
import { onModifyCarte } from "../function/MenuCartes/onModifyCarte"
import { ArrowRightLeft, Check, Heart, X } from "lucide-react"
function MenuCartes({ cartes, indexCarte, setUser, user, extension }) {
  const [obtenu, setObtenu] = useState(false)
  const [trade, setTrade] = useState(false)
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    setObtenu(cartes.obtenu)
    setTrade(cartes.trade)
    setLiked(cartes.liked)
  }, [cartes])
  return (
    <div className="relative flex flex-col items-center gap-[10px]">
      <div className="flex w-full gap-[10px]">
        <p className="text-xl text-white">{cartes.numero}</p>
        <p className="h-[28px] max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap text-xl text-white">
          {cartes.nom}
        </p>
      </div>

      <div className={`bg-black ${cartes.obtenu ? "grayscale-0" : "grayscale"} relative rounded-lg`}>
        {cartes.image && (
          <img
            src={`${import.meta.env.VITE_API_URL}/${cartes.image}`}
            alt=""
            className="h-[240px] rounded-lg"
            onClick={() => onModifyCarte("obtenu", obtenu, extension._id, indexCarte, setUser, user)}
          />
        )}
      </div>

      <div className="absolute bottom-[10px] flex w-full items-center justify-between px-[8px]">
        <div
          className={`flex items-center justify-center text-xl text-white ${
            liked ? "bg-green-100" : "bg-red-100"
          } cursor-pointer select-none rounded-full p-[5px]`}
          onClick={() => {
            onModifyCarte("liked", liked, extension._id, indexCarte, setUser, user)
          }}
        >
          <Heart
            className={`${liked ? "text-green-500" : "text-red-500"} ${liked ? "fill-current" : "fill-none"}`}
            strokeWidth={liked ? 0 : 2}
          />
        </div>
        <div
          className={`flex items-center justify-center text-xl text-white ${
            obtenu ? "bg-green-100" : "bg-red-100"
          } cursor-pointer select-none rounded-full p-[5px]`}
          onClick={() => onModifyCarte("obtenu", obtenu, extension._id, indexCarte, setUser, user)}
        >
          {obtenu ? <Check className="text-green-500" /> : <X className="text-red-500" />}
        </div>

        {extension.nom !== "Promo-A" && (
          <div
            className={`flex items-center justify-center text-xl text-white ${
              trade ? "bg-green-100" : "bg-red-100"
            } cursor-pointer select-none rounded-full p-[5px]`}
            onClick={() => {
              onModifyCarte("trade", trade, extension._id, indexCarte, setUser, user)
            }}
          >
            <ArrowRightLeft className={`${trade ? "text-green-500" : "text-red-500"}`} />
          </div>
        )}
      </div>
    </div>
  )
}
MenuCartes.propTypes = {
  cartes: PropTypes.object.isRequired,
  indexCarte: PropTypes.number.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  extension: PropTypes.object.isRequired,
}
export default MenuCartes
