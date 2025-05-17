import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
function DropDownRarete({ cartes, rarete, modifyCarte, indexCarte, modifyExtension, setExtension }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  function onModifyCarte(raretes) {
    setOpen(!open)
    modifyCarte("rarete", raretes, indexCarte, modifyExtension, setExtension)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={dropdownRef}
      className="relative flex h-[35px] w-[35px] items-center justify-center rounded-lg bg-secondary p-[5px]"
      onClick={() => setOpen(!open)}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/${rarete.find((e) => e._id === cartes.rarete).url}`}
        alt=""
        className="min-h-[10px] min-w-[10px]"
      />
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[38px] w-[35px] flex-col items-center gap-[5px] rounded-lg bg-secondary p-[5px]`}
      >
        {rarete.map((raretes, index) => (
          <img
            src={`${import.meta.env.VITE_API_URL}/${raretes.url}`}
            alt=""
            key={index}
            onClick={() => onModifyCarte(raretes._id)}
          />
        ))}
      </div>
    </div>
  )
}
DropDownRarete.propTypes = {
  cartes: PropTypes.object.isRequired,
  rarete: PropTypes.array.isRequired,
  modifyCarte: PropTypes.func.isRequired,
  indexCarte: PropTypes.number.isRequired,
  modifyExtension: PropTypes.string.isRequired,
  setExtension: PropTypes.func.isRequired,
}
export default DropDownRarete
