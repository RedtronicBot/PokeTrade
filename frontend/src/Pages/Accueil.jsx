import { useEffect, useState } from "react"
import { Link } from "react-router"

import axios from "axios"
import PropTypes from "prop-types"
function Accueil({ name }) {
  const [extension, setExtension] = useState([])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/extension`)
      .then((res) => setExtension(res.data))
      .catch((err) => console.error(err))
  }, [name])
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-auto flex-wrap justify-center gap-[45px]">
        {extension.length > 0 &&
          extension
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((extensions, index) => (
              <Link to={`/extension/${extensions._id}`} key={index}>
                <div className="flex h-[160px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-md bg-tertiary py-[10px] text-white">
                  <p className="text-lg">{extensions.nom}</p>
                  <div className="flex items-center justify-center gap-[10px] pt-[5px]">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${extensions.image}`}
                      className="max-h-[130px] max-w-[200px]"
                    />
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
Accueil.propTypes = {
  name: PropTypes.string.isRequired,
}
export default Accueil
