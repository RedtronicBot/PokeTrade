import NavBar from "./NavBar"
import { Outlet } from "react-router"
import PropTypes from "prop-types"
const NavBarOutlet = ({ login, name, logout }) => {
  return (
    <div>
      <NavBar login={login} name={name} logout={logout} />
      <Outlet />
    </div>
  )
}
NavBarOutlet.propTypes = {
  login: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}
export default NavBarOutlet
