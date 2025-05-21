import NavBar from "./NavBar"
import { Outlet } from "react-router"

const NavBarOutlet = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default NavBarOutlet
