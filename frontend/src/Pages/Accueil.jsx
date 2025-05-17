import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import pokeliste from "../assets/logo.png"
import axios from "axios"
import PropTypes from "prop-types"
function Accueil({ login, name, logout }) {
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
  return (
    <div className="flex h-full min-h-screen flex-col items-center gap-[10px] bg-primary font-sans">
      <div className="mb-[25px] flex h-[100px] w-full items-center justify-between bg-menu px-[15px] py-[20px]">
        <img src={pokeliste} alt="" className="h-full w-auto object-contain" />
        <Link to="/trade">
          <p className="text-xl text-white">Échange</p>
        </Link>
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
              <Link to="/admin">
                <div>Admin</div>
              </Link>
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
  login: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}
export default Accueil
