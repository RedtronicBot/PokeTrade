import { useState } from "react"
import PropTypes from "prop-types"
import cross from "../assets/x-solid.svg"
import trade_logo from "../assets/arrow-right-arrow-left-solid.svg"
/*fonctions*/
import { onModifyCarte } from "../function/MenuCartes/onModifyCarte"
import { uploadExtension } from "../function/MenuCartes/uploadExtension"
import { onReset } from "../function/MenuCartes/onReset"
function MenuCartes({ cartes, indexCarte, nomExtension, setUser, user }) {
  const [open, setOpen] = useState(false)
  const [obtenu, setObtenu] = useState(false)
  const [trade, setTrade] = useState(false)

  function onSetOpen(carteData) {
    setOpen(!open)
    setObtenu(carteData.obtenu)
    setTrade(carteData.trade)
  }

  return (
    <div className="relative flex flex-col items-center gap-[10px]">
      <div className="flex w-full justify-around">
        <p className="text-xl text-white">{cartes.numero}</p>
        <p className="h-[28px] max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap text-xl text-white">
          {cartes.nom}
        </p>
      </div>

      {user.carte !== undefined ? (
        <div
          className={`bg-black ${
            user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu ? "opacity-100" : "opacity-50"
          } relative rounded-lg`}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/${cartes.image}`}
            alt=""
            onClick={() =>
              (user.nom !== undefined || user.nom !== "") &&
              onSetOpen(user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte])
            }
            className="h-[240px] rounded-lg"
          />
          <div
            className={`absolute left-[-5px] top-[-5px] ${
              user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].trade ? "flex" : "hidden"
            } rounded-md bg-green-600 p-[5px]`}
          >
            <img
              src={trade_logo}
              alt=""
              className="h-[20px]"
              style={{
                filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg bg-black opacity-50">
          <img src={`${import.meta.env.VITE_API_URL}/${cartes.image}`} alt="" className="h-[240px] rounded-lg" />
        </div>
      )}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute h-[288px] w-[183px] flex-col items-center justify-around gap-[10px] rounded-md bg-secondary p-[10px]`}
      >
        <div className="absolute right-[10px] top-[10px] flex justify-end">
          <img
            src={cross}
            alt=""
            className="h-[20px] cursor-pointer"
            onClick={() => onReset(user, setUser, setOpen)}
            style={{
              filter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(313deg) brightness(110%) contrast(101%)",
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-[10px]">
          <div
            className={`flex items-center justify-center text-xl text-white ${
              obtenu ? "bg-green-700" : "bg-red-700"
            } w-[100px] cursor-pointer select-none rounded-lg px-[8px] py-[5px]`}
            onClick={() => onModifyCarte("obtenu", obtenu, nomExtension, indexCarte, setUser, setObtenu)}
          >
            <p>Obtenu</p>
          </div>
          {user.carte !== undefined && (
            <div
              className={`${
                user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu
                  ? ""
                  : "cursor-not-allowed opacity-50"
              } flex items-center justify-center text-xl text-white ${
                trade ? "bg-green-700" : "bg-red-700"
              } w-[100px] cursor-pointer select-none rounded-lg px-[8px] py-[5px]`}
              onClick={() => {
                if (!user.carte.find((ext) => ext.nom === nomExtension).carte[indexCarte].obtenu) return
                onModifyCarte("trade", trade, nomExtension, indexCarte, setUser, setTrade)
              }}
            >
              <p>Tradable</p>
            </div>
          )}
        </div>

        <div className="w-fit cursor-pointer rounded-md bg-tertiary px-[15px] py-[10px]">
          <p className="text-xl text-white" onClick={() => uploadExtension(user, setOpen, setUser)}>
            Modifier
          </p>
        </div>
      </div>
    </div>
  )
}
MenuCartes.propTypes = {
  cartes: PropTypes.object.isRequired,
  indexCarte: PropTypes.number.isRequired,
  nomExtension: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default MenuCartes
