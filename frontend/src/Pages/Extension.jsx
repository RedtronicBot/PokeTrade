import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import PropTypes from "prop-types"
import MenuCartes from "../Components/MenuCartes"
function Extension({ name }) {
  const [extension, setExtension] = useState([])
  const [user, setUser] = useState({})
  const { id } = useParams()
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
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-full items-center justify-between px-[15px]">
        <Link to="/">
          <ArrowLeft size={36} className="text-white" />
        </Link>
        <h1 className="text-3xl text-white">
          Extension {extension.length > 0 && extension.filter((ext) => ext._id === id)[0].nom}
        </h1>
        <p className="select-none"></p>
      </div>
      {
        <div className="flex flex-wrap justify-center gap-[15px] px-[20px] py-[15px]">
          {name
            ? Object.keys(user).length > 0 &&
              extension.length > 0 &&
              extension
                .filter((ext) => ext._id === id)[0]
                .carte.map((cartes, index) => (
                  <MenuCartes
                    cartes={cartes}
                    key={index}
                    indexCarte={index}
                    extension={extension.find((ext) => ext._id === id)}
                    setUser={setUser}
                    user={user}
                  />
                ))
            : extension.length > 0 &&
              extension
                .filter((ext) => ext._id === id)[0]
                .carte.map((cartes, index) => (
                  <div className="flex flex-col items-center gap-[10px]" key={index}>
                    <div className="flex w-full gap-[10px]">
                      <p className="text-xl text-white">{cartes.numero}</p>
                      <p className="h-[28px] max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap text-xl text-white">
                        {cartes.nom}
                      </p>
                    </div>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${cartes.image}`}
                      alt=""
                      className="h-[240px] rounded-lg grayscale"
                    />
                  </div>
                ))}
        </div>
      }
    </div>
  )
}
Extension.propTypes = {
  name: PropTypes.string.isRequired,
}
export default Extension
