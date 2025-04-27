import { useEffect, useState } from "react"
import retour from "../assets/back_logo.png"
import axios from "axios"
import PropTypes from "prop-types"
import MenuCartes from "../Components/MenuCartes"
function Extension({ setRoute, routeExtension, name }) {
  const [extension, setExtension] = useState([])
  const [user, setUser] = useState({})
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/extension`)
      .then((res) => setExtension(res.data))
      .catch((err) => console.error(err))
    if (name !== "") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${name}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err))
    }
  }, [name])
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-full items-center justify-between px-[15px]">
        <img src={retour} alt="" onClick={() => setRoute("Accueil")} />
        <h1 className="text-3xl text-white">
          Extension {extension.length > 0 && extension.filter((ext) => ext.nom === routeExtension)[0].nom}
        </h1>
        <p className="select-none text-transparent">u</p>
      </div>
      <div className="flex flex-wrap justify-center gap-[15px] px-[20px] py-[15px]">
        {extension.length > 0 &&
          extension
            .filter((ext) => ext.nom === routeExtension)[0]
            .carte.map((cartes, index) => (
              <MenuCartes
                cartes={cartes}
                key={index}
                indexCarte={index}
                nomExtension={routeExtension}
                setUser={setUser}
                user={user}
              />
            ))}
      </div>
    </div>
  )
}
Extension.propTypes = {
  setRoute: PropTypes.func.isRequired,
  routeExtension: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
export default Extension
