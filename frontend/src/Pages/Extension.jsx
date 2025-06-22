import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router"
import { ArrowLeft, RefreshCcw } from "lucide-react"
import axios from "axios"
import PropTypes from "prop-types"
import MenuCartes from "../Components/MenuCartes"
import { ArrowRightLeft, Check, Heart, X } from "lucide-react"
function Extension({ name }) {
  const [extension, setExtension] = useState([])
  const [user, setUser] = useState({})
  const { id } = useParams()
  const [obtenu, setObtenu] = useState(null)
  const [trade, setTrade] = useState(null)
  const [liked, setLiked] = useState(null)
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
  const onReset = () => {
    setLiked(null)
    setTrade(null)
    setObtenu(null)
  }
  const carte = useMemo(() => {
    if (Object.keys(user).length > 0 && extension.length > 0) {
      const extensions = extension.find((ext) => (ext._id = id))
      const userExtension = user.extension.find((ext) => ext.idExtension === id)
      if (!extensions || !userExtension) return []
      return extensions.carte.map((carte, index) => ({
        ...carte,
        obtenu: userExtension.carte[index].obtenu,
        trade: userExtension.carte[index].trade,
        liked: userExtension.carte[index].liked,
      }))
    }
  }, [extension, user])

  const toggleLiked = () => {
    setLiked((prev) => (prev === null ? true : prev === true ? false : null))
  }
  const toggleObtenu = () => {
    setObtenu((prev) => (prev === null ? true : prev === true ? false : null))
  }
  const toggleTrade = () => {
    setTrade((prev) => (prev === null ? true : prev === true ? false : null))
  }
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mt-[20px] flex w-full items-center justify-between px-[15px]">
        <Link to="/">
          <ArrowLeft size={36} className="text-white" />
        </Link>
        <h1 className="text-3xl text-white">
          Extension {extension.length > 0 && extension.filter((ext) => ext._id === id)[0].nom}
        </h1>
        <div className="flex items-center gap-2">
          <RefreshCcw onClick={onReset} className="cursor-pointer select-none text-white" />
          <div
            className={`flex items-center justify-center text-xl text-white ${
              liked === null ? "bg-gray-100" : liked ? "bg-green-100" : "bg-red-100"
            } cursor-pointer select-none rounded-full p-[5px]`}
            onClick={toggleLiked}
          >
            <Heart
              className={`${liked === null ? "text-gray-500" : liked ? "text-green-500" : "text-red-500"} ${liked ? "fill-current" : "fill-none"}`}
              strokeWidth={liked ? 0 : 2}
            />
          </div>
          <div
            className={`flex items-center justify-center text-xl text-white ${
              obtenu === null ? "bg-gray-100" : obtenu ? "bg-green-100" : "bg-red-100"
            } cursor-pointer select-none rounded-full p-[5px]`}
            onClick={toggleObtenu}
          >
            {obtenu === null ? (
              <Check className="text-gray-500" />
            ) : obtenu ? (
              <Check className="text-green-500" />
            ) : (
              <X className="text-red-500" />
            )}
          </div>
          {extension.length > 0 && extension.find((ext) => ext._id === id).nom !== "Promo-A" && (
            <div
              className={`flex items-center justify-center text-xl text-white ${
                trade === null ? "bg-gray-100" : trade ? "bg-green-100" : "bg-red-100"
              } cursor-pointer select-none rounded-full p-[5px]`}
              onClick={toggleTrade}
            >
              <ArrowRightLeft
                className={`${trade === null ? "text-gray-500" : trade ? "text-green-500" : "text-red-500"}`}
              />
            </div>
          )}
        </div>
      </div>
      {
        <div className="flex flex-wrap justify-center gap-[15px] px-[20px] py-[15px]">
          {name
            ? Object.keys(user).length > 0 &&
              carte &&
              carte.length > 0 &&
              carte
                .filter((c) => (obtenu !== null ? c.obtenu === obtenu : true))
                .filter((c) => (liked !== null ? c.liked === liked : true))
                .filter((c) => (trade !== null ? c.trade === trade : true))
                .map((cartes, index) => (
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
