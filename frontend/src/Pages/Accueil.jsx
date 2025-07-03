import { useEffect, useState } from "react"
import { Link } from "react-router"

import axios from "axios"
import PropTypes from "prop-types"
function Accueil({ name }) {
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
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => console.error(err))
    }
  }, [name])

  function formatPercent(value) {
    const percent = value * 100
    return Number.isInteger(percent) ? percent.toString() : percent.toFixed(2)
  }
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-auto flex-wrap justify-center gap-[45px]">
        {Object.keys(user).length > 0 &&
          extension.length > 0 &&
          extension
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((extensions, index) => {
              const nbCarte = extensions.nbCarte
              const userExtension = user.extension.find((ext) => ext.idExtension === extensions._id)
              const cartes = userExtension?.carte.slice(0, nbCarte) || []
              const nbObtenues = cartes.filter((c) => c.obtenu === true).length
              const percent = formatPercent(nbObtenues / nbCarte)
              return (
                <Link to={`/extension/${extensions._id}`} key={index}>
                  <div className="flex h-[180px] w-[300px] cursor-pointer flex-col items-center justify-between rounded-md bg-tertiary py-[10px] text-white">
                    <p className="text-lg">{extensions.nom}</p>
                    <div className="flex items-center justify-center gap-[10px]">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${extensions.image}`}
                        className="max-h-[130px] max-w-[200px]"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between gap-[5px] px-1">
                      <div className="flex h-[12px] flex-1 items-center justify-start rounded border-2 border-white">
                        <div className={`h-[8px] bg-blue-600`} style={{ width: `${percent}%` }}></div>
                      </div>
                      <p className="pb-[3px]">{percent}%</p>
                    </div>
                  </div>
                </Link>
              )
            })}
      </div>
    </div>
  )
}
Accueil.propTypes = {
  name: PropTypes.string.isRequired,
}
export default Accueil
