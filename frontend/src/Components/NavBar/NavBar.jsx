import { useState, useEffect } from "react"
import { Link } from "react-router"
import pokeliste from "../../assets/logo.png"
import axios from "axios"
import PropTypes from "prop-types"
const NavBar = ({ login, name, logout }) => {
  const [menu, setMenu] = useState(false)
  const [user, setUser] = useState({})
  useEffect(() => {
    if (name !== "") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${name}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err))
    }
  }, [name])
  return (
    <div className="flex h-[100px] w-full items-center justify-between bg-menu px-[15px] py-[20px]">
      <img src={pokeliste} alt="" className="h-full w-auto object-contain" />
      {name && (
        <Link to="/trade">
          <p className="text-xl text-white">Échange</p>
        </Link>
      )}
      {login ? (
        <div
          className="flex cursor-pointer select-none items-center justify-center gap-[10px] rounded-xl bg-secondary px-[15px] py-[10px] text-3xl text-white"
          onClick={() => (user.admin ? setMenu(!menu) : logout())}
        >
          <p>{user.nom}</p>
          <img src={user.avatar_url} className="h-[40px] rounded-full object-cover" />
        </div>
      ) : (
        <Link to={`${import.meta.env.VITE_API_URL}/auth`}>
          <div className="flex cursor-pointer select-none items-center justify-center rounded-xl bg-secondary px-[15px] py-[10px] text-3xl text-white">
            <p>Login</p>
          </div>
        </Link>
      )}
      {login && menu && (
        <div
          className={`absolute right-[15px] top-[85px] flex flex-col items-center justify-center gap-[10px] rounded-xl bg-secondary px-[10px] py-[10px] text-white`}
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
  )
}
NavBar.propTypes = {
  login: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}
export default NavBar
