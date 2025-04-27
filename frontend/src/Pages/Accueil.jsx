import { useEffect, useRef, useState } from "react"
import pokeliste from "../assets/logo.png"
import axios from "axios"
import PropTypes from "prop-types"
function Accueil({ setRoute, login, setRouteExtension, name, logout }) {
  const [menu, setMenu] = useState(false)
  const [extension, setExtension] = useState([])
  const [user, setUser] = useState({})
  const loginRef = useRef(null)
  const [loginWidth, setLoginWidth] = useState(124)
  useEffect(() => {
    if (loginRef.current) {
      const width = loginRef.current.getBoundingClientRect().width
      setLoginWidth(parseInt(width))
    }
  }, [user])
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
  function onSetRouteExtension(extension) {
    setRoute("Extension")
    setRouteExtension(extension)
  }
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mb-[25px] flex h-[100px] w-full items-center justify-between bg-menu px-[15px] py-[20px]">
        <img src={pokeliste} alt="" className="h-full w-auto object-contain" />
        <p className="text-xl text-white" onClick={() => setRoute("Trade")}>
          Échange
        </p>
        {login ? (
          <div
            className="flex cursor-pointer select-none items-center justify-center gap-[10px] rounded-xl bg-secondary px-[15px] py-[10px] text-3xl text-white"
            onClick={() => (user.admin ? setMenu(!menu) : logout())}
            ref={loginRef}
          >
            <p>{user.nom}</p>
            <img src={user.avatar_url} className="h-[40px] rounded-full object-cover" />
          </div>
        ) : (
          <a href={`${import.meta.env.VITE_API_URL}/auth`}>
            <div className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-secondary px-[15px] py-[10px] text-3xl text-white">
              <p>Login</p>
            </div>
          </a>
        )}
        {login && menu && (
          <div
            className={`absolute right-[15px] top-[85px] flex flex-col items-center justify-center gap-[10px] rounded-xl bg-secondary px-[10px] py-[10px] text-white w-[${loginWidth}px]`}
          >
            <div className="flex w-full select-none justify-center rounded-md bg-tertiary px-[15px] py-[10px]">
              <div onClick={() => setRoute("Admin")}>Admin</div>
            </div>
            <div
              className="flex w-full select-none justify-center rounded-md bg-tertiary px-[15px] py-[10px]"
              onClick={() => logout()}
            >
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-auto flex-wrap justify-center gap-[45px]">
        {extension.length > 0 &&
          extension
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((extensions, index) => (
              <div
                key={index}
                className="flex w-[300px] cursor-pointer flex-col items-center justify-center rounded-md bg-tertiary py-[10px] text-white"
                onClick={() => onSetRouteExtension(extensions.nom)}
              >
                <p className="text-lg">{extensions.nom}</p>
                <div className="flex items-center justify-center gap-[10px] pt-[5px]">
                  {extensions.logo !== "" && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${extensions.logo}`}
                      className="max-h-[64px] max-w-[64px]"
                    />
                  )}
                  <img src={extensions.image} className="max-h-[130px] max-w-[200px]" />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
Accueil.propTypes = {
  setRoute: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
  setRouteExtension: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}
export default Accueil
